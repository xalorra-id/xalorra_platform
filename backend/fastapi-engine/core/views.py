from django.http import JsonResponse
from django.db import connection
from .models import Workspace, Dataset, ColumnMetadata
from .serializers import DatasetSerializer, ColumnMetadataSerializer, WorkspaceSerializer
from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
import pandas as pd

# 🔹 Non-DRF: List workspace aktif berdasarkan user login
def workspace_list(request):
    print("✅ Aktif di schema:", connection.schema_name)
    workspaces = Workspace.objects.filter(created_by=request.user)
    data = WorkspaceSerializer(workspaces, many=True).data
    return JsonResponse(data, safe=False)

# 🔹 DRF ViewSet untuk Dataset (upload, list, preview, columns)
class DatasetViewSet(viewsets.ModelViewSet):
    serializer_class = DatasetSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filter dataset by user login (RLS Level 1)
        """
        return Dataset.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        file = self.request.FILES.get("file")
        name = self.request.data.get("name") or file.name
        workspace_id = self.request.data.get("workspace")

        # 🧠 Ambil workspace berdasarkan ID & user
        workspace = get_object_or_404(
            Workspace, id=workspace_id, created_by=self.request.user
        )

        dataset = serializer.save(name=name, workspace=workspace, user=self.request.user)

        # ✅ Simpan metadata kolom otomatis
        try:
            df = pd.read_csv(dataset.file.path, nrows=100)
            for idx, col in enumerate(df.columns):
                ColumnMetadata.objects.create(
                    dataset=dataset,
                    name=col,
                    dtype=str(df[col].dtype),
                    order=idx,
                )
        except Exception as e:
            print(f"⚠️ Gagal membaca metadata kolom: {e}")

    @action(detail=True, methods=["get"])
    def preview(self, request, pk=None):
        dataset = self.get_object()
        try:
            df = pd.read_csv(dataset.file.path, nrows=5)
            return Response({"preview": df.to_dict(orient="records")})
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(detail=True, methods=["get"])
    def columns(self, request, pk=None):
        dataset = self.get_object()
        columns = dataset.columns.order_by("order")
        serializer = ColumnMetadataSerializer(columns, many=True)
        return Response({"columns": serializer.data})

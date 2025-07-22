from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from core.models import Workspace
from apps.api.auth.jwt_utils import get_current_user
from django_tenants.utils import schema_context
import uuid

# ✅ JANGAN pakai prefix di sini — biarkan main.py yang atur
router = APIRouter()

# 🧾 Schema input
class WorkspaceUploadRequest(BaseModel):
    name: str
    description: Optional[str] = None
    metadata: Optional[dict] = None

# 🚀 Endpoint upload workspace
@router.post("/upload", tags=["Workspace Management"])
def upload_workspace(payload: WorkspaceUploadRequest, current_user=Depends(get_current_user)):
    tenant = current_user["tenant"]
    try:
        with schema_context(tenant):
            workspace = Workspace.objects.create(
                id=uuid.uuid4(),
                name=payload.name,
                description=payload.description,
                metadata=payload.metadata,
                created_by_id=current_user["user_id"]
            )
        return {
            "id": str(workspace.id),
            "name": workspace.name,
            "description": workspace.description,
            "metadata": workspace.metadata
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal membuat workspace: {str(e)}")

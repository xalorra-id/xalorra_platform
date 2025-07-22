from rest_framework import serializers
from .models import Dataset, ColumnMetadata

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ['id', 'name', 'file', 'workspace', 'created_at']
        read_only_fields = ['id', 'created_at', 'workspace']

class ColumnMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColumnMetadata
        fields = ['id', 'name', 'dtype', 'order']

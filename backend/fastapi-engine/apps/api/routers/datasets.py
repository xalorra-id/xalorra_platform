# routers/datasets.py
from fastapi import APIRouter, Depends
from django_tenants.utils import schema_context
from sqlalchemy.orm import Session
from db.session import get_db
from apps.api.auth.dependencies import get_current_user
from apps.api.models.dataset import Dataset

router = APIRouter()

@router.get("/datasets")
def list_datasets(user=Depends(get_current_user), db: Session = Depends(get_db)):
    tenant = user["tenant"]

    if tenant == "public":
        # RLS Level 1: filter berdasarkan workspace_id
        return db.query(Dataset).filter(Dataset.workspace_id == user["workspace_id"]).all()
    else:
        # RLS Level 2: schema isolation
        with schema_context(tenant):
            return db.query(Dataset).all()

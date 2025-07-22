from fastapi import APIRouter, Depends, UploadFile, File
from auth.dependencies import get_current_user  # atau sesuaikan path sesuai strukturmu

router = APIRouter()

@router.post("/upload-dataset")
async def upload_dataset(
    file: UploadFile = File(...),
    current=Depends(get_current_user)
):
    return {
        "message": f"Dataset uploaded by {current['user'].email} (tenant: {current['tenant']})"
    }
# apps/api/routers/datasets.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from auth.dependencies import get_current_user
from django_tenants.utils import schema_context
from apps.api.models.dataset import Dataset

router = APIRouter(prefix="/datasets", tags=["Datasets"])

@router.get("/")
def list_datasets(user=Depends(get_current_user), db: Session = Depends(get_db)):
    tenant = user["tenant"]
    workspace_id = user["workspace_id"]

    if tenant == "public":
        # RLS Level 1: filter berdasarkan workspace
        return db.query(Dataset).filter(Dataset.workspace_id == workspace_id).all()
    else:
        # RLS Level 2: masuk ke schema terpisah
        with schema_context(tenant):
            return db.query(Dataset).all()

from fastapi import (
    APIRouter, UploadFile, File, Form, HTTPException, Query, Depends
)
from fastapi.responses import JSONResponse
from pathlib import Path
import shutil
import uuid
import pandas as pd
import os

from apps.api.auth.dependencies import get_current_user

router = APIRouter()

UPLOAD_ROOT = Path("/opt/xalorra-discord/uploads/datasets")


@router.post("/upload-dataset")
async def upload_dataset(
    file: UploadFile = File(...),
    tenant: str = Form(...),
    current=Depends(get_current_user)
):
    # Validasi file hanya CSV
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")

    # Buat direktori per tenant
    tenant_dir = UPLOAD_ROOT / tenant
    tenant_dir.mkdir(parents=True, exist_ok=True)

    # Buat nama file unik
    unique_filename = f"{file.filename.rsplit('.', 1)[0]}_{uuid.uuid4().hex[:6]}.csv"
    save_path = tenant_dir / unique_filename

    # Simpan file
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Baca isi file untuk preview
    try:
        df = pd.read_csv(save_path)
        preview = df.head(5).to_dict(orient="records")
        columns = list(df.columns)
        row_count = len(df)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal membaca CSV: {str(e)}")

    return {
        "message": "File uploaded successfully",
        "filename": unique_filename,
        "saved_to": str(save_path),
        "tenant": tenant,
        "columns": columns,
        "rows": row_count,
        "preview": preview
    }


@router.get("/list-datasets")
def list_datasets(
    tenant: str = Query(..., description="Tenant name"),
    current=Depends(get_current_user)
):
    tenant_dir = UPLOAD_ROOT / tenant
    if not tenant_dir.exists():
        return JSONResponse(content={"datasets": []})

    datasets = []
    for f in sorted(tenant_dir.glob("*.csv"), reverse=True):
        datasets.append({
            "filename": f.name,
            "path": str(f),
            "size_kb": round(f.stat().st_size / 1024, 2),
            "uploaded_at": f.stat().st_mtime,
        })

    return JSONResponse(content={"datasets": datasets})

from fastapi import APIRouter, HTTPException, Query, Body, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from pathlib import Path
import pandas as pd
import numpy as np
import xgboost as xgb
import time
import json
import os
import logging
from typing import List, Dict

from apps.api.auth.dependencies import get_current_user

# Setup logger
LOG_DIR = Path("/opt/xalorra-discord/logs")
LOG_DIR.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    filename=str(LOG_DIR / "xalorra-api.log"),
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

router = APIRouter()

UPLOAD_DIR = Path("/opt/xalorra-discord/uploads/datasets")
MODEL_DIR = Path("/opt/xalorra-discord/uploads/models")
MODEL_DIR.mkdir(parents=True, exist_ok=True)


class TrainRequest(BaseModel):
    tenant: str
    filename: str
    target_column: str


class TrainResponse(BaseModel):
    message: str
    tenant: str
    filename: str
    model_path: str
    accuracy: float
    columns: list
    trained_at: float
    model_type: str


def is_classification_target(y: pd.Series) -> bool:
    if y.dtype == "object":
        return True
    if y.dtype.name == "category":
        return True
    if pd.api.types.is_bool_dtype(y):
        return True
    if pd.api.types.is_integer_dtype(y) and y.nunique() <= 15:
        return True
    return False


@router.post("/train-model", response_model=TrainResponse)
def train_model(
    payload: TrainRequest,
    current=Depends(get_current_user)
):
    dataset_path = UPLOAD_DIR / payload.tenant / payload.filename
    if not dataset_path.exists():
        raise HTTPException(status_code=404, detail="Dataset not found.")

    try:
        df = pd.read_csv(dataset_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal membaca file CSV: {str(e)}")

    if payload.target_column not in df.columns:
        raise HTTPException(status_code=400, detail=f"Kolom target '{payload.target_column}' tidak ditemukan.")

    X = df.drop(columns=[payload.target_column])
    y = df[payload.target_column]
    X = X.select_dtypes(include=[np.number]).copy()

    is_classification = is_classification_target(y)
    model_type = "classification" if is_classification else "regression"
    logger.info(f"🔍 Detected model type: {model_type}")

    if is_classification:
        unique_classes = np.unique(y)
        if not np.issubdtype(y.dtype, np.integer) or np.min(unique_classes) < 0 or not np.array_equal(unique_classes, np.arange(len(unique_classes))):
            y = pd.factorize(y)[0]
        model = xgb.XGBClassifier(use_label_encoder=False, eval_metric="logloss")
    else:
        model = xgb.XGBRegressor()

    try:
        model.fit(X, y)
    except Exception as e:
        logger.error(f"❌ Gagal training: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Gagal melakukan training: {str(e)}")

    accuracy = model.score(X, y)

    model_filename = f"{payload.filename.replace('.csv','')}_{int(time.time())}.json"
    model_path = MODEL_DIR / payload.tenant
    model_path.mkdir(parents=True, exist_ok=True)
    full_path = model_path / model_filename
    model.save_model(str(full_path))

    metadata = {
        "tenant": payload.tenant,
        "filename": payload.filename,
        "model_path": str(full_path),
        "accuracy": accuracy,
        "columns": list(X.columns),
        "trained_at": time.time(),
        "model_type": model_type
    }
    log_path = full_path.with_suffix(".meta.json")
    with open(log_path, "w") as f:
        json.dump(metadata, f)

    logger.info(f"✅ Training success for tenant={payload.tenant}, file={payload.filename}, acc={accuracy:.3f}")
    return TrainResponse(**metadata, message="Training berhasil")


@router.get("/list-models")
def list_models(
    tenant: str = Query(..., description="Tenant name"),
    current=Depends(get_current_user)
):
    model_path = MODEL_DIR / tenant
    if not model_path.exists():
        raise HTTPException(status_code=404, detail="Tenant belum memiliki model.")

    models = []
    for file in model_path.glob("*.meta.json"):
        try:
            with open(file) as f:
                meta = json.load(f)
                models.append({
                    "model_name": Path(meta["model_path"]).name,
                    "accuracy": meta.get("accuracy"),
                    "model_type": meta.get("model_type"),
                    "trained_at": meta.get("trained_at"),
                    "columns": meta.get("columns", [])
                })
        except Exception as e:
            logger.warning(f"Gagal membaca metadata {file.name}: {e}")
            continue

    return JSONResponse(content=models)


@router.post("/predict")
def predict(
    tenant: str = Body(...),
    model_name: str = Body(...),
    instances: List[Dict] = Body(...),
    current=Depends(get_current_user)
):
    model_path = MODEL_DIR / tenant / model_name
    if not model_path.exists():
        raise HTTPException(status_code=404, detail="Model tidak ditemukan.")

    meta_path = model_path.with_suffix(".meta.json")
    if not meta_path.exists():
        raise HTTPException(status_code=404, detail="Metadata model tidak ditemukan.")

    try:
        with open(meta_path) as f:
            meta = json.load(f)
        model_type = meta.get("model_type", "classification")
        feature_columns = meta.get("columns", [])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal membaca metadata: {str(e)}")

    try:
        df = pd.DataFrame(instances)[feature_columns]
        dmatrix = xgb.DMatrix(df)
        booster = xgb.Booster()
        booster.load_model(str(model_path))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal mempersiapkan data/model: {str(e)}")

    try:
        preds = booster.predict(dmatrix).tolist()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal melakukan prediksi: {str(e)}")

    return {"predictions": preds}

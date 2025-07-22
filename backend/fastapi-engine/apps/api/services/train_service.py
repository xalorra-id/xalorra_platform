import os
import sys
import pandas as pd
import logging
import traceback
from django_tenants.utils import schema_context
from mlmodels.models import MLModel

from apps.api.models import xgboost_trainer, tensorflow_trainer

# Setup logger
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def log_stderr(msg):
    print(f"[DEBUG] {msg}", file=sys.stderr)


def train_model(
    algorithm: str,
    schema: str,
    dataset_path: str,
    test_size: float = 0.2,
    max_depth: int = 6,
    learning_rate: float = 0.3,
    n_estimators: int = 100
):
    """
    Train a machine learning model with specified algorithm and hyperparameters.
    """
    try:
        log_stderr(">> [SERVICE] Start train_model()")
        log_stderr(f">> dataset_path type: {type(dataset_path)}")
        log_stderr(f">> dataset_path value: {dataset_path}")

        if not isinstance(dataset_path, str):
            raise TypeError("dataset_path must be a string")

        # Resolve full path
        BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
        full_path = os.path.join(BASE_DIR, dataset_path.lstrip("/"))
        log_stderr(f">> BASE_DIR: {BASE_DIR}")
        log_stderr(f">> FULL PATH: {full_path}")

        logger.info(f"[TRAIN] Start | algo={algorithm} | schema={schema} | path={full_path}")

        if not os.path.exists(full_path):
            error_msg = f"Dataset not found: {full_path}"
            logger.error(f"[ERROR] {error_msg}")
            return {"error": error_msg}

        df = pd.read_csv(full_path)
        log_stderr(f">> CSV Loaded: {df.shape[0]} rows x {df.shape[1]} columns")

        if "target" not in df.columns:
            error_msg = "CSV must contain a 'target' column"
            logger.error(f"[ERROR] {error_msg}")
            return {"error": error_msg}

        X = df.drop(columns=["target"])
        y = df["target"]

        if algorithm == "xgboost":
            result = xgboost_trainer.train(
                X, y, schema,
                max_depth=max_depth,
                learning_rate=learning_rate,
                n_estimators=n_estimators
            )
        elif algorithm == "tensorflow":
            result = tensorflow_trainer.train(X, y, schema)
        else:
            error_msg = f"Unsupported algorithm: {algorithm}"
            logger.error(f"[ERROR] {error_msg}")
            return {"error": error_msg}

        with schema_context(schema):
            MLModel.objects.create(
                name=result.get("name", f"{algorithm}-model"),
                accuracy=result.get("accuracy", 0),
                input_features=list(X.columns),
                model_path=result.get("model_path", ""),
                algorithm=algorithm
            )

        logger.info(f"[TRAIN SUCCESS] Model saved | schema={schema}")

        log_stderr(">> [SERVICE] Returning success result")

        return {
            "name": result.get("name"),
            "accuracy": result.get("accuracy"),
            "model_path": result.get("model_path"),
            "features": list(X.columns),
            "algorithm": algorithm
        }

    except Exception as e:
        tb = traceback.format_exc()
        logger.error(f"[EXCEPTION] {tb}")
        log_stderr(f"[EXCEPTION] {tb}")
        return {
            "error": str(e),
            "traceback": tb
        }

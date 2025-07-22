import os
import pandas as pd
import xgboost as xgb
import datetime
import logging
from pathlib import Path
from typing import Dict, Any
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Setup logger
logger = logging.getLogger(__name__)


def generic_preprocessor(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # Convert datetime-like or 'time' columns to UNIX timestamp (safe version)
    for col in df.columns:
        if pd.api.types.is_datetime64_any_dtype(df[col]) or "time" in col.lower():
            try:
                df[col] = pd.to_datetime(df[col], errors="coerce")
                df[col] = df[col].map(lambda x: int(x.timestamp()) if pd.notnull(x) else 0)
            except Exception as e:
                logger.warning(f"Skipping datetime conversion for column '{col}': {e}")

    # Label encode categorical columns
    for col in df.select_dtypes(include=["object", "category"]).columns:
        df[col] = LabelEncoder().fit_transform(df[col].astype(str))

    return df


def train_model(
    csv_path: str,
    schema: str,
    algorithm: str = "xgboost",
    test_size: float = 0.2,
    max_depth: int = 6,
    learning_rate: float = 0.3,
    n_estimators: int = 100
) -> Dict[str, Any]:
    """
    Train a machine learning model using XGBoost or other supported algorithms.
    """
    logger.debug(">> Start train_model()")
    logger.debug(f">> CSV path: {csv_path}")
    logger.debug(f">> Tenant schema: {schema}")

    # Resolve path to CSV
    base_dir = Path(__file__).resolve().parent.parent.parent
    full_path = base_dir / csv_path
    logger.debug(f">> Full CSV path resolved: {full_path}")

    # Load CSV
    try:
        df = pd.read_csv(full_path)
    except Exception as e:
        logger.error(f"Failed to load CSV: {e}")
        raise

    logger.debug(f">> Loaded dataset: {df.shape[0]} rows x {df.shape[1]} columns")

    if "target" not in df.columns:
        raise ValueError("CSV must contain a 'target' column")

    df = generic_preprocessor(df)
    X = df.drop(columns=["target"])
    y = df["target"]

    # Split into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42
    )

    # Train model
    if algorithm.lower() == "xgboost":
        model = xgb.XGBClassifier(
            use_label_encoder=False,
            eval_metric="logloss",
            max_depth=max_depth,
            learning_rate=learning_rate,
            n_estimators=n_estimators
        )
        model.fit(X_train, y_train)
        accuracy = model.score(X_test, y_test)

        logger.info(f"[TRAIN] XGBoost trained with accuracy: {accuracy:.4f}")

        # Save model to schema-specific directory
        model_dir = Path("uploads") / schema
        model_dir.mkdir(parents=True, exist_ok=True)
        model_path = model_dir / "model.json"
        model.save_model(model_path)

        logger.debug(f">> Model saved to: {model_path}")

        return {
            "name": f"xgb-model-{datetime.datetime.now().strftime('%Y%m%d-%H%M%S')}",
            "accuracy": accuracy,
            "model_path": str(model_path),
            "algorithm": "xgboost"
        }

    raise ValueError(f"Unsupported algorithm: {algorithm}")


# Alias
def train(*args, **kwargs):
    return train_model(*args, **kwargs)

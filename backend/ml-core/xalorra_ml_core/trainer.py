# xalorra_ml_core/trainer.py

import xgboost as xgb
from sklearn.model_selection import train_test_split

def train_model(X, y, model_type="xgboost"):
    if model_type == "xgboost":
        model = xgb.XGBClassifier()
    else:
        raise ValueError("Model belum didukung")
    
    model.fit(X, y)
    return model

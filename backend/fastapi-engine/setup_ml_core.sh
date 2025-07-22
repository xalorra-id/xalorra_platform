#!/bin/bash

# Jalankan dari root /opt/xalorra-discord
cd /opt/xalorra-discord/apps/api

echo "📁 Membuat folder models/"
mkdir -p models

echo "📝 Membuat models/xgboost_trainer.py"
cat > models/xgboost_trainer.py << EOF
import xgboost as xgb
import pandas as pd

def train(dataset_path: str):
    df = pd.read_csv(dataset_path)
    X = df.drop("target", axis=1)
    y = df["target"]

    model = xgb.XGBClassifier()
    model.fit(X, y)

    model.save_model("xgboost_model.json")

    return {"status": "success", "message": "XGBoost training completed"}
EOF

echo "📝 Membuat models/tensorflow_trainer.py"
cat > models/tensorflow_trainer.py << EOF
import tensorflow as tf
import pandas as pd

def train(dataset_path: str):
    df = pd.read_csv(dataset_path)
    X = df.drop("target", axis=1)
    y = df["target"]

    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(1)
    ])

    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=10)

    model.save("tensorflow_model.keras")

    return {"status": "success", "message": "TensorFlow training completed"}
EOF

echo "🔧 Update services/train_service.py"
cat > services/train_service.py << EOF
from models import xgboost_trainer, tensorflow_trainer

def train_model(model: str, dataset_path: str):
    if model == "xgboost":
        return xgboost_trainer.train(dataset_path)
    elif model == "tensorflow":
        return tensorflow_trainer.train(dataset_path)
    else:
        return {"error": "Unsupported model"}
EOF

echo "✅ Selesai setup core training logic!"

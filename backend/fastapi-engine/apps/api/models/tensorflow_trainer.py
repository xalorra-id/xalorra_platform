import os
import pandas as pd
import datetime
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder

def generic_preprocessor(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    for col in df.columns:
        if pd.api.types.is_datetime64_any_dtype(df[col]):
            df[col] = pd.to_datetime(df[col]).astype("int64") // 10**9
        elif "time" in col.lower():
            try:
                df[col] = pd.to_datetime(df[col]).astype("int64") // 10**9
            except Exception:
                pass

    for col in df.select_dtypes(include="object").columns:
        df[col] = LabelEncoder().fit_transform(df[col].astype(str))

    return df

def train(csv_path: str, schema: str):
    df = pd.read_csv(csv_path)

    if "target" not in df.columns:
        raise ValueError("CSV must contain a 'target' column")

    df = generic_preprocessor(df)

    X = df.drop(columns=["target"])
    y = df["target"]

    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(1)
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    model.fit(X, y, epochs=10, verbose=0)

    os.makedirs(f"uploads/{schema}/", exist_ok=True)
    model_path = f"uploads/{schema}/tensorflow_model.keras"
    model.save(model_path)

    return {
        "name": f"tf-model-{datetime.datetime.now().strftime('%Y%m%d-%H%M%S')}",
        "accuracy": model.evaluate(X, y, verbose=0)[1],
        "model_path": model_path,
    }

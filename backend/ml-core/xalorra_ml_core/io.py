# xalorra_ml_core/io.py

import joblib
import os

def save_model(model, path: str):
    directory = os.path.dirname(path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    joblib.dump(model, path)
    print(f"[✔] Model berhasil disimpan ke: {path}")

def load_model(path: str):
    if not os.path.exists(path):
        raise FileNotFoundError(f"[!] File model tidak ditemukan: {path}")
    model = joblib.load(path)
    print(f"[✔] Model berhasil dimuat dari: {path}")
    return model

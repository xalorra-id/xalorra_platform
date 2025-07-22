# xalorra_ml_core/predictor.py

import pandas as pd
from xalorra_ml_core.io import load_model

def predict_from_csv(model_path: str, input_csv: str) -> pd.DataFrame:
    """
    Load model dari file .joblib dan prediksi data baru dari CSV.

    Returns:
        DataFrame dengan kolom prediksi (dan probabilitas jika ada)
    """
    model = load_model(model_path)
    df = pd.read_csv(input_csv)

    preds = model.predict(df)
    result_df = df.copy()
    result_df["prediction"] = preds

    # Jika model support predict_proba (misalnya klasifikasi), tambahkan
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(df)
        for i in range(probs.shape[1]):
            result_df[f"prob_class_{i}"] = probs[:, i]

    return result_df

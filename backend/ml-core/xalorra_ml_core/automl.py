from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from xalorra_ml_core.evaluator import evaluate_model
import xgboost as xgb
import numpy as np
import pandas as pd

def run_automl(X, y, metric: str = "f1_score"):
    """
    Uji beberapa model dan pilih yang terbaik berdasarkan metrik.
    Supported metric: accuracy, precision, recall, f1_score
    """
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # 💡 XGBoost memerlukan target float jika binary
    if pd.Series(y_train).nunique() == 2:
        y_train = y_train.astype(np.float32)
        y_test = y_test.astype(np.float32)

    models = {
        "xgboost": xgb.XGBClassifier(objective="binary:logistic", eval_metric="logloss"),
        "random_forest": RandomForestClassifier(),
        "logistic_regression": LogisticRegression(max_iter=500),
        "svm": SVC(probability=True)
    }

    best_score = -1
    best_model = None
    best_name = ""
    all_results = {}

    for name, model in models.items():
        try:
            print(f"[🔁] Training {name} ...")
            model.fit(X_train, y_train)
            results = evaluate_model(model, X_test, y_test)
            score = results.get(metric, 0)
            all_results[name] = results

            print(f"[📊] {name} {metric}: {score:.4f}")
            if score > best_score:
                best_score = score
                best_model = model
                best_name = name
        except Exception as e:
            print(f"[❌] Gagal melatih {name}: {e}")
            continue

    if best_model is None:
        raise RuntimeError("Tidak ada model yang berhasil dilatih.")

    print(f"[🏆] Model terbaik: {best_name} dengan {metric}: {best_score:.4f}")
    return best_model, best_name, best_score, all_results

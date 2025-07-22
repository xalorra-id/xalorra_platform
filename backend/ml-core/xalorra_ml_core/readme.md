import pandas as pd
from xalorra_ml_core.automl import run_automl
df = pd.read_csv("sample.csv")
X = df[["f1", "f2"]]
y = df["label"]
model, name, score, results = run_automl(X, y)
print(results)
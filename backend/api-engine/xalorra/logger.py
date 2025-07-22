import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Ambil dari environment variable atau fallback ke ./logs
LOG_PATH = os.getenv("LOG_PATH", os.path.join(os.getcwd(), "logs", "predictions.log"))
LOG_DIR = os.path.dirname(LOG_PATH)

# Pastikan folder log ada
os.makedirs(LOG_DIR, exist_ok=True)

def log_prediction(user_id, model, features, prediction):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{now}] model={model}, user={user_id}, features={features}, prediction={prediction}\n"
    with open(LOG_PATH, "a") as f:
        f.write(line)

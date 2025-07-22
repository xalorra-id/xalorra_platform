import os
from datetime import datetime
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Path log dari environment atau default
LOG_PATH = os.getenv("LOG_PATH", "/opt/API_engine/logs/predictions.log")

def log_prediction(model: str, features: list, result):
    timestamp = datetime.now().isoformat()
    entry = f"[{timestamp}] model={model} input={features} prediction={result}\n"

    print("📝 MENULIS KE LOG:", LOG_PATH)
    print("📦 ENTRY:", entry.strip())

    try:
        with open(LOG_PATH, "a") as f:
            f.write(entry)
    except Exception as e:
        print("❌ GAGAL TULIS LOG:", e)

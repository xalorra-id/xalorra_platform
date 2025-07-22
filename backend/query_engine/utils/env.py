# utils/env.py
import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", 5432)),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
}

JWT_ORG_ID_CLAIM = os.getenv("JWT_ORG_ID_CLAIM", "org_id")
DEFAULT_ORG_ID = os.getenv("DEFAULT_ORG_ID", "public")

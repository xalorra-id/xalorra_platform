import os
import sys
import logging
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# === 1. Logging Setup ===
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("xalorra.api")

# === 2. Path & Env Setup ===
BASE_DIR = Path(__file__).resolve().parent.parent  # /opt/xalorra-discord
sys.path.append(str(BASE_DIR))  # tambahkan ke PYTHONPATH agar import Django & apps bisa

env_path = BASE_DIR / ".env"
load_dotenv(dotenv_path=env_path)

# === 3. Django Initialization ===
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "xalorra.settings")

try:
    import django
    django.setup()
    logger.info("✅ Django initialized successfully")
except Exception as e:
    logger.error("❌ Django initialization failed: %s", str(e))
    raise

# === 4. FastAPI Router Imports ===
from apps.api.routers.auth.me import router as me_router
from apps.api.routers.auth.signup import router as signup_router
from apps.api.routers.auth.login import router as login_router
from apps.api.routers.upload import router as upload_router
from apps.api.routers.train_model import router as train_model_router
from apps.api.routers.workspace import router as workspace_router
from apps.api.routers.datasets import router as datasets_router

# === 5. Metadata ===
APP_METADATA = {
    "title": "Xalorra API Service",
    "description": "Core API service for Xalorra Platform",
    "version": "1.3.0",
    "contact": {
        "name": "Xalorra Dev Team",
        "email": "dev@xalorra.com"
    }
}

# === 6. FastAPI App ===
def create_app() -> FastAPI:
    app = FastAPI(**APP_METADATA)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://studio.xalorra.com"],  # ✅ FIX CORS Error
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["X-Total-Count"]
    )

    ROUTERS = [
        (signup_router, "/auth", "Auth"),
        (login_router, "/auth", "Auth"),
        (me_router, "/auth", "Auth"),
        (upload_router, "/upload", "File Upload"),
        (train_model_router, "/train", "Model Training"),
        (workspace_router, "/workspaces", "Workspace Management"),
        (datasets_router, "/datasets", "Datasets"),
    ]

    for router, prefix, tag in ROUTERS:
        app.include_router(router, prefix=f"/api{prefix}", tags=[tag])

    @app.get("/api/health", tags=["System"])
    async def health_check():
        return {
            "status": "healthy",
            "service": "xalorra-api",
            "version": APP_METADATA["version"],
            "django_ready": True
        }

    @app.get("/", include_in_schema=False)
    async def root():
        return {
            "message": "Welcome to Xalorra API Service",
            "endpoints": {
                "docs": "/docs",
                "redoc": "/redoc",
                "openapi": "/openapi.json"
            },
            "env": os.getenv("ENVIRONMENT", "development")
        }

    return app

# === 7. Entrypoint ===
app = create_app()

# db/session.py

from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine
from decouple import config
from dotenv import load_dotenv
from pathlib import Path
import os

# Muat file .env dari direktori root project
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# Ambil URL DB dari .env
DATABASE_URL = config("SQLALCHEMY_DATABASE_URL")

# Buat engine dan session factory
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency FastAPI
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()

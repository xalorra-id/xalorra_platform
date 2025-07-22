# xalorra/jwt_utils.py
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "default-secret")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        return None

def encode_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

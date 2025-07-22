# utils/jwt_decoder.py

import jwt
from decouple import config

SECRET_KEY = config("SECRET_KEY")

def decode_jwt(token: str):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded
    except jwt.PyJWTError:
        return None

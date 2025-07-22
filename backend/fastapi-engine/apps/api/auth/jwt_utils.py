from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from decouple import config
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional, Dict

# 🔐 Konfigurasi JWT
SECRET_KEY = config("SECRET_KEY", default="xalorra-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 jam

# 🔑 Skema hash untuk password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ⛓️ OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")  # ⬅️ disesuaikan

# 🔧 Generate JWT
def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ✅ Verifikasi password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# ✅ Hash password
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# ✅ Decode token manual (opsional)
def decode_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# ✅ Ambil user dari token
def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        sub = payload.get("sub")
        user_id = payload.get("user_id")
        workspace_id = payload.get("workspace_id")  # ⬅️ konsisten dengan signup/login
        role = payload.get("role")
        if sub is None or user_id is None or workspace_id is None or role is None:
            raise credentials_exception
        return {
            "sub": sub,
            "user_id": user_id,
            "workspace_id": workspace_id,
            "role": role,
        }
    except JWTError:
        raise credentials_exception

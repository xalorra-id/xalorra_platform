from fastapi import Depends, HTTPException, Header
from jose import JWTError
from apps.api.auth.jwt_utils import decode_token
from django_tenants.utils import schema_context
from core.models import User

async def get_current_user(authorization: str = Header(...)):
    # 1️⃣ Validasi format Bearer Token
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.removeprefix("Bearer ").strip()

    # 2️⃣ Decode JWT Token
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Could not decode token")

    user_id = payload.get("user_id")
    tenant = payload.get("tenant") or payload.get("workspace_id")
    role = payload.get("role")

    if not user_id or not tenant:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    # 3️⃣ Ambil user dari schema yang sesuai
    try:
        with schema_context(tenant):
            user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")

    # 4️⃣ Return info user + context
    return {
        "user": user,
        "user_id": user_id,
        "tenant": tenant,
        "role": role,
        "token": token,
    }

from fastapi import APIRouter, HTTPException
from core.models import User
from apps.api.auth.schemas import LoginRequest, TokenResponse
from apps.api.auth.jwt_utils import verify_password, create_access_token

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    email = payload.email
    password = payload.password
    workspace_id = payload.workspace_id

    user = User.objects.filter(email=email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({
        "sub": email,
        "user_id": str(user.id),
        "workspace_id": workspace_id,
        "role": user.role
    })

    return {"access_token": token}

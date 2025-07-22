from fastapi import APIRouter, HTTPException
from core.models import User
from apps.api.auth.schemas import SignupRequest, TokenResponse
from apps.api.auth.jwt_utils import create_access_token, get_password_hash
import uuid

router = APIRouter()

@router.post("/signup", response_model=TokenResponse)
def signup(payload: SignupRequest):
    if User.objects.filter(email=payload.email).exists():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User.objects.create(
        id=uuid.uuid4(),
        email=payload.email,
        password=get_password_hash(payload.password),
        role="user"
    )

    token = create_access_token({
        "sub": payload.email,
        "user_id": str(user.id),
        "role": user.role
    })

    return {"access_token": token}

# routers/auth.py
from fastapi import APIRouter, HTTPException
from auth.schemas import SignupRequest, TokenResponse, LoginRequest
from auth.jwt_utils import create_access_token
from auth.password import get_password_hash, verify_password
from models import User  # Django ORM
from django_tenants.utils import schema_context
import uuid

router = APIRouter()

@router.post("/signup", response_model=TokenResponse)
def signup(payload: SignupRequest):
    tenant = payload.tenant
    email = payload.email

    if tenant == "public":
        workspace_id = str(uuid.uuid4())
    else:
        workspace_id = None

    with schema_context(tenant):
        if User.objects.filter(email=email).exists():
            raise HTTPException(status_code=400, detail="Email already registered")

        user = User.objects.create(
            id=uuid.uuid4(),
            email=email,
            password=get_password_hash(payload.password),
            role="user",
            workspace_id=workspace_id
        )

    token = create_access_token({
        "sub": user.email,
        "user_id": str(user.id),
        "tenant": tenant,
        "role": user.role,
        "workspace_id": workspace_id
    })

    return {"access_token": token}

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    tenant = payload.tenant
    email = payload.email

    with schema_context(tenant):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise HTTPException(status_code=404, detail="User not found")

        if not verify_password(payload.password, user.password):
            raise HTTPException(status_code=400, detail="Incorrect password")

    token = create_access_token({
        "sub": user.email,
        "user_id": str(user.id),
        "tenant": tenant,
        "role": user.role,
        "workspace_id": getattr(user, "workspace_id", None)
    })

    return {"access_token": token}

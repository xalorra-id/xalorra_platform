from fastapi import APIRouter, HTTPException
from .schemas import SignupRequest, LoginRequest, TokenResponse
from .jwt_utils import create_access_token
from django_tenants.utils import schema_context
from core.models import User

router = APIRouter()

@router.post("/signup", response_model=TokenResponse)
def signup(data: SignupRequest):
    with schema_context(data.tenant):
        if User.objects.filter(email=data.email).exists():
            raise HTTPException(status_code=400, detail="Email already registered")

        # ✅ create_user otomatis hashing password + set username
        user = User.objects.create_user(
            username=data.email,  # atau buat slugify(data.email) kalau mau lebih aman
            email=data.email,
            password=data.password
        )

    token = create_access_token({
        "user_id": user.id,
        "tenant": data.tenant,
        "role": "default"
    })
    return {"access_token": token}


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    with schema_context(data.tenant):
        try:
            user = User.objects.get(email=data.email)
        except User.DoesNotExist:
            raise HTTPException(status_code=404, detail="User not found")

        # ✅ gunakan Django native check_password (built-in)
        if not user.check_password(data.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "user_id": user.id,
        "tenant": data.tenant,
        "role": "default"
    })
    return {"access_token": token}

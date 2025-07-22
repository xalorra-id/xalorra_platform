from pydantic import BaseModel, EmailStr

# 🟢 Signup hanya butuh email & password
class SignupRequest(BaseModel):
    email: EmailStr
    password: str

# 🔐 Login: user sudah punya workspace, maka workspace_id ikut dikirim
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    workspace_id: str

# 🎟️ Token response
class TokenResponse(BaseModel):
    access_token: str

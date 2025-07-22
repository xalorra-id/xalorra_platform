from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    workspace_id: str

class TokenResponse(BaseModel):
    access_token: str

# middlewares/auth_middleware.py

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from utils.jwt_decoder import decode_jwt

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse({"error": "Unauthorized"}, status_code=401)

        token = auth_header.split("Bearer ")[1]
        payload = decode_jwt(token)

        if not payload:
            return JSONResponse({"error": "Invalid token"}, status_code=401)

        request.state.user = payload
        return await call_next(request)

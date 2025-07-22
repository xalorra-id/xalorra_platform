import os
from xalorra.jwt_utils import decode_token
from xalorra.request import Request
from xalorra.response import JSONResponse

JWT_SECRET = os.getenv("JWT_SECRET", "changeme")

def middleware(handler):
    async def wrapper(request: Request):
        auth_header = request.headers.get("authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse({"error": "Unauthorized"}, status_code=401)

        token = auth_header.split(" ")[1]

        try:
            payload = decode_token(token, secret=JWT_SECRET)
        except Exception as e:
            return JSONResponse({"error": "Invalid token"}, status_code=401)

        # inject user info into request
        request.user_id = payload.get("user_id")
        request.organization_id = payload.get("organization_id")
        request.scopes = payload.get("scopes", [])

        return await handler(request)

    return wrapper

# middlewares/auth_middleware.py
import base64
import json

async def auth_middleware(scope, receive, send):
    headers = dict(scope.get("headers", []))
    token = None

    if b"authorization" in headers:
        auth_header = headers[b"authorization"].decode()
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]

    org_id = None
    if token:
        try:
            payload_part = token.split(".")[1]
            padded = payload_part + "=" * (-len(payload_part) % 4)
            decoded = base64.urlsafe_b64decode(padded)
            payload = json.loads(decoded)
            org_id = payload.get("org_id")  # atau sesuai claim JWT kamu
        except Exception as e:
            print(f"JWT decode error: {e}")

    scope["org_id"] = org_id or "public"  # fallback
    return scope

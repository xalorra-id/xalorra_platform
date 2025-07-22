from xalorra.jwt_utils import decode_token
from xalorra.response import Response

middlewares = []

def middleware(func):
    middlewares.append(func)
    return func

async def apply_middlewares(request, handler):
    async def call_next(req):
        return await handler(req)

    for mw in reversed(middlewares):
        prev_call_next = call_next
        call_next = lambda req, mw=mw, next=prev_call_next: mw(req, next)

    return await call_next(request)

# ==========================
# Middleware: Auth Checker
# ==========================

@middleware
async def auth_middleware(request, call_next):
    # Ambil header Authorization dari scope
    auth_header = None
    for name, value in request.scope.get("headers", []):
        if name == b"authorization":
            auth_header = value.decode()
            break

    print("🔍 Authorization:", auth_header)

    if not auth_header or not auth_header.startswith("Bearer "):
        print("❌ Token hilang atau salah format")
        return Response("Unauthorized", 401)

    # Ambil token setelah "Bearer "
    token = auth_header[len("Bearer "):].strip()

    if not token:
        print("❌ Token kosong setelah Bearer")
        return Response("Unauthorized", 401)

    payload = decode_token(token)

    if not payload:
        print("❌ Token tidak valid")
        return Response("Unauthorized", 401)

    # Inject user ke dalam request
    request.user = payload
    return await call_next(request)

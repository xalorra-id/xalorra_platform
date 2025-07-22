from xalorra.response import Response
from xalorra.jwt_utils import decode_token

def get_token_from_scope(scope):
    for name, value in scope.get("headers", []):
        if name == b"authorization":
            return value.decode()
    return None

def auth_middleware(request, call_next):
    auth_header = get_token_from_scope(request.scope)
    print("🔍 Authorization:", auth_header)

    if not auth_header or not auth_header.startswith("Bearer "):
        print("❌ Token hilang atau salah format")
        return Response("Unauthorized", 401)

    token = auth_header.split("Bearer ")[1]
    payload = decode_token(token)

    if not payload:
        print("❌ Token tidak valid")
        return Response("Unauthorized", 401)

    request.user = payload  # Inject ke request
    return call_next(request)

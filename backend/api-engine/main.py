# main.py

from xalorra.routing import get, post
from xalorra.response import Response
from xalorra.json_response import JSONResponse
from xalorra.cli import run
from xalorra.middleware import middleware
from xalorra.jwt_utils import decode_token
from xalorra.utils.logger import log_prediction  # Logging prediksi

# === Middleware JWT ===
@middleware
async def auth_middleware(req, call_next):
    print("🛡️ Masuk middleware...")

    headers = req.scope["headers"]
    auth = None
    for k, v in headers:
        if k == b"authorization":
            auth = v.decode()

    print("🔍 Authorization:", auth)

    if not auth or not auth.startswith("Bearer "):
        print("❌ Token hilang atau salah format")
        return Response("Unauthorized", 401)

    token = auth[7:]
    payload = decode_token(token)
    print("📦 Payload:", payload)

    if not payload:
        return Response("Invalid token", 401)

    req.state["user_id"] = payload.get("user_id")
    req.state["role"] = payload.get("role")
    req.state["tenant"] = payload.get("tenant")
    return await call_next(req)

# === Root Endpoint ===
@get("/")
async def hello(req):
    return Response("Hello from Xalorra Internal API!")

# === Authenticated Endpoint ===
@get("/whoami")
async def whoami(req):
    print("✅ Masuk endpoint /whoami")
    user = req.state.get("user_id")
    return Response(f"Authenticated user: {user}")

# === JSON Echo Test ===
@post("/echo")
async def echo(req):
    data = await req.json()
    return JSONResponse({"you_sent": data})

# === Predict Endpoint dengan Logging ===
@post("/predict/{model}")
async def predict(req, model):
    print(f"🚀 Predict using model: {model}")
    data = await req.json()
    features = data.get("features", [])
    print("🔍 Fitur input:", features)

    result = sum(features) if isinstance(features, list) else None

    # ⏺ Log ke file
    log_prediction(model, features, result)

    return JSONResponse({
        "model": model,
        "input": features,
        "prediction": result
    })

# === Entry Point ===
if __name__ == "__main__":
    run()

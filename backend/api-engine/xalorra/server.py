import os
from dotenv import load_dotenv

from xalorra.routing import resolve_route
from xalorra.request import Request
from xalorra.response import Response
from xalorra.middleware import apply_middlewares
from xalorra.websocket import websocket_predict_stream  # WebSocket handler

# Load environment variables
load_dotenv()

# Ambil path dari ENV (default fallback ke "/ws/predict-stream")
PREDICT_STREAM_PATH = os.getenv("PREDICT_STREAM_PATH", "/ws/predict-stream")

async def app(scope, receive, send):
    if scope["type"] == "websocket":
        print(f"📡 WebSocket handler triggered: {scope['path']}")

        try:
            if scope["path"] == PREDICT_STREAM_PATH:
                await websocket_predict_stream(scope, receive, send)
            else:
                print(f"⚠️ Unknown WebSocket path: {scope['path']}")
                await send({
                    "type": "websocket.close",
                    "code": 1000  # Normal closure
                })
        except Exception as e:
            print("💥 WebSocket handler error:", e)
            try:
                await send({
                    "type": "websocket.close",
                    "code": 1011  # Internal error
                })
            except Exception as close_error:
                print("❌ Gagal menutup WebSocket:", close_error)
        return

    # HTTP handling
    path = scope["path"].strip("/")
    method = scope["method"]
    print(f"➡️  {method} /{path}")  # Log HTTP request masuk

    handler, path_params = resolve_route(method, path)
    if handler is None:
        print("❌ Handler tidak ditemukan")
        response = Response("Not Found", 404)
    else:
        request = Request(scope, receive)
        try:
            response = await apply_middlewares(request, lambda r: handler(r, **path_params))
        except Exception as e:
            print("💥 Exception middleware/handler:", e)
            response = Response(f"Internal Server Error: {str(e)}", 500)

    try:
        await send({
            "type": "http.response.start",
            "status": response.status_code,
            "headers": response.to_asgi()["headers"],
        })
        await send({
            "type": "http.response.body",
            "body": response.to_asgi()["body"],
        })
    except Exception as e:
        print("💥 Exception send():", e)

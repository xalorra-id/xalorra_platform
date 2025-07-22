#!/bin/bash

# Nama proyek
PROJECT_NAME="API_engine"
BASE_DIR="/opt/$PROJECT_NAME"

# Buat direktori
mkdir -p "$BASE_DIR/xalorra"
cd "$BASE_DIR" || exit

# Buat file utama
touch main.py
touch pyproject.toml
touch requirements.txt

# Buat modul internal
cat > xalorra/__init__.py <<EOF
# Xalorra API Internal
EOF

cat > xalorra/routing.py <<EOF
routes = {}

def route(method: str, path: str):
    def decorator(func):
        routes[(method.upper(), path)] = func
        return func
    return decorator

def get(path): return route("GET", path)
def post(path): return route("POST", path)
EOF

cat > xalorra/request.py <<EOF
class Request:
    def __init__(self, scope, receive):
        self.scope = scope
        self.receive = receive
EOF

cat > xalorra/response.py <<EOF
class Response:
    def __init__(self, content: str, status_code: int = 200):
        self.content = content.encode()
        self.status_code = status_code

    def to_asgi(self):
        return {
            "status": self.status_code,
            "body": self.content,
            "headers": [(b"content-type", b"text/plain")],
        }
EOF

cat > xalorra/server.py <<EOF
from xalorra.routing import routes
from xalorra.request import Request
from xalorra.response import Response

async def app(scope, receive, send):
    if scope["type"] != "http":
        return

    path = scope["path"]
    method = scope["method"]
    handler = routes.get((method, path))

    if handler is None:
        response = Response("Not Found", 404)
    else:
        request = Request(scope, receive)
        result = await handler(request) if callable(handler) else "Internal Error"
        response = result if isinstance(result, Response) else Response(str(result))

    await send({
        "type": "http.response.start",
        "status": response.status_code,
        "headers": response.to_asgi()["headers"],
    })
    await send({
        "type": "http.response.body",
        "body": response.to_asgi()["body"],
    })
EOF

cat > xalorra/cli.py <<EOF
import uvicorn

def run():
    uvicorn.run("xalorra.server:app", host="0.0.0.0", port=8000, reload=True)
EOF

cat > main.py <<EOF
from xalorra.routing import get
from xalorra.response import Response
from xalorra.cli import run

@get("/")
async def hello(req):
    return Response("Hello from Xalorra Internal API!")

if __name__ == "__main__":
    run()
EOF

# Tambahkan requirements
cat > requirements.txt <<EOF
uvicorn
EOF

# Tampilkan hasil
echo "✅ Proyek $PROJECT_NAME berhasil dibuat di $BASE_DIR"

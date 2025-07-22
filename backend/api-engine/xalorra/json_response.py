# xalorra/json_response.py
import json

class JSONResponse:
    def __init__(self, data: dict, status_code: int = 200):
        self.content = json.dumps(data).encode()
        self.status_code = status_code

    def to_asgi(self):
        return {
            "status": self.status_code,
            "body": self.content,
            "headers": [(b"content-type", b"application/json")],
        }

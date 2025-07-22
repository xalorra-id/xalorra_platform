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

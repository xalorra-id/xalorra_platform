# xalorra/request.py
import json

class Request:
    def __init__(self, scope, receive):
        self.scope = scope
        self.receive = receive
        self.state = {}

    async def json(self):
        body = b""
        more_body = True
        while more_body:
            message = await self.receive()
            body += message.get("body", b"")
            more_body = message.get("more_body", False)
        return json.loads(body.decode())

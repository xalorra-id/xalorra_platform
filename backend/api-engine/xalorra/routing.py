import re
from xalorra.websocket import websocket_predict_stream

routes = {}

def route(method: str, path: str):
    def decorator(func):
        routes[(method.upper(), path.strip("/"))] = func
        return func
    return decorator

def get(path): return route("GET", path)
def post(path): return route("POST", path)

def resolve_route(method: str, path: str):
    path = path.strip("/")
    for (m, p), handler in routes.items():
        if m != method:
            continue
        if "{" in p and "}" in p:
            # dynamic route
            pattern = re.sub(r"{(\w+)}", r"(?P<\1>[^/]+)", p.strip("/"))
            match = re.fullmatch(pattern, path)
            if match:
                return handler, match.groupdict()
        elif p.strip("/") == path:
            return handler, {}
    return None, {}

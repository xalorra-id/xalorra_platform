# routes/datasets.py
from xalorra.routing import get
from starlette.requests import Request
from starlette.responses import JSONResponse

@get("/datasets/list")
async def list_datasets(request: Request):
    return JSONResponse({
        "message": "Datasets endpoint active!",
        "user": getattr(request, "user", "unknown")
    })

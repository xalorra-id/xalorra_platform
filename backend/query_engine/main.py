from core.query_executor import run_query
from db.connection import get_connection
from middlewares.jwt_middleware import decode_jwt_from_header
from routes.query import handle_query
from utils.logger import log_request
from utils.env import get_env

from xalorra.routing import get, post
from xalorra.middleware import use_middleware
from xalorra.request import Request
from xalorra.response import Response, JSONResponse
from xalorra.cli import run

# --- Middleware Setup ---
@use_middleware
async def auth_middleware(request: Request):
    token = request.headers.get("authorization", "").replace("Bearer ", "")
    if not token:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    
    try:
        user_info = decode_jwt_from_header(token)
        request.user = user_info  # Attach user to request
    except Exception as e:
        return JSONResponse({"error": f"Invalid token: {str(e)}"}, status_code=401)

# --- ROUTES ---

@get("/")
async def root(request: Request):
    return JSONResponse({"message": "Welcome to Xalorra Query Engine"})

@post("/datasets/")
async def create_dataset(request: Request):
    data = await request.json()
    user = request.user

    # Simulasi insert dataset
    print(f"Saving dataset for org_id={user['organization_id']}, user_id={user['user_id']}")
    return JSONResponse({
        "status": "ok",
        "message": f"Dataset '{data.get('name')}' created",
        "organization_id": user["organization_id"]
    })

@get("/datasets/")
async def list_datasets(request: Request):
    user = request.user
    org_id = user["organization_id"]

    # Dummy return - nanti diganti dengan query dari database via Query Executor
    datasets = [
        {"id": 1, "name": "Sales 2024", "organization_id": org_id},
        {"id": 2, "name": "Inventory", "organization_id": org_id}
    ]
    return JSONResponse({"datasets": datasets})

# --- RUN ---
if __name__ == "__main__":
    run()

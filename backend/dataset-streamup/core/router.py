# core/router.py
from starlette.applications import Starlette
from starlette.routing import Route
from middlewares.auth_middleware import AuthMiddleware
from routes.datasets import list_datasets

routes = [
    Route("/datasets/list", list_datasets, methods=["GET"]),
]

app = Starlette(debug=True, routes=routes)
app.add_middleware(AuthMiddleware)

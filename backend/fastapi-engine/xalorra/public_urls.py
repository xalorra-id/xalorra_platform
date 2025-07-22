from django.urls import path
from django.http import JsonResponse

# Public-only view (misal health check)
def public_root_view(request):
    return JsonResponse({"message": "Welcome to Xalorra Public API"})

urlpatterns = [
    path("", public_root_view),  # akses http://localhost:8888/
    path("healthcheck/", public_root_view),
]

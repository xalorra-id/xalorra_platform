from django.urls import path
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Xalorra API is running (public schema)"})

urlpatterns = [
    path("", home),
]

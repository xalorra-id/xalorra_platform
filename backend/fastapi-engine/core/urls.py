from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import workspace_list, DatasetViewSet

router = DefaultRouter()
router.register(r'datasets', DatasetViewSet, basename='datasets')

urlpatterns = [
    path("workspaces/", workspace_list, name="workspace_list"),
] + router.urls

from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),  # hanya untuk schema 'public'
]

# Tambahkan ini agar file media (uploads/datasets/...) bisa diakses
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

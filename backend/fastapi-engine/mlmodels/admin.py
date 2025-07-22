from django.contrib import admin
from .models import MLModel

@admin.register(MLModel)
class MLModelAdmin(admin.ModelAdmin):
    list_display = ("name", "accuracy", "trained_at")
    readonly_fields = ("trained_at",)

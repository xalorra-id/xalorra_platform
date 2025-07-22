import os
import uuid
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# === Custom User Manager ===
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.pop("username", None)
        if not email:
            raise ValueError("Email wajib diisi")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

# === Custom User Model ===
class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=50, default="user")
    workspace_id = models.CharField(max_length=100, null=True, blank=True)  # ✅ Final RLS Level 1
    tenant = models.CharField(max_length=100, null=True, blank=True)        # 👈 Optional untuk bridge hybrid RLS/Schema

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

# === Upload path untuk file dataset per workspace ===
def workspace_dataset_upload_path(instance, filename):
    workspace_name = instance.workspace.name.replace(" ", "_").lower()
    return os.path.join('datasets', workspace_name, filename)

# === Workspace model ===
class Workspace(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    workspace_id = models.CharField(max_length=100, unique=True)  # ✅ Tambahkan ini
    description = models.TextField(null=True, blank=True)
    metadata = models.JSONField(null=True, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="workspaces",
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# === Dataset per Workspace ===
class Dataset(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name='datasets')
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to=workspace_dataset_upload_path)
    created_at = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='datasets'
    )

    def __str__(self):
        return f"{self.name} ({self.workspace.name})"

# === Metadata kolom CSV ===
class ColumnMetadata(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name='columns')
    name = models.CharField(max_length=100)
    dtype = models.CharField(max_length=100)
    order = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} ({self.dtype})"

# === Prediksi hasil model ===
class Prediction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name='predictions')
    result = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='predictions'
    )

    def __str__(self):
        return f"Prediction for {self.dataset.name} at {self.created_at}"

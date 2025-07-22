import jwt
from django_tenants.middleware.main import TenantMainMiddleware
from django_tenants.utils import get_tenant_model
from django.conf import settings
from core.models import User  # pastikan path sesuai project kamu

class HybridTenantMiddleware(TenantMainMiddleware):
    def get_tenant(self, request):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "").strip()

        # Default schema fallback (user gratis)
        schema = "public"

        if token:
            try:
                decoded = jwt.decode(
                    token,
                    options={"verify_signature": False},  # ⚠️ non-strict, cocok untuk Supabase
                )
                sub = decoded.get("sub")  # Supabase user ID (UUID)

                # Cari user dari UUID
                if sub:
                    user = User.objects.filter(id=sub).first()
                    if user:
                        # Cek apakah user premium
                        if user.is_premium and user.schema_name:
                            schema = user.schema_name
                        else:
                            schema = "public"
            except Exception as e:
                print(f"[WARN] Token decode error (fallback ke public): {e}")

        # Ambil tenant schema
        TenantModel = get_tenant_model()
        tenant = TenantModel.objects.get(schema_name=schema)
        request.schema_name = schema
        return tenant

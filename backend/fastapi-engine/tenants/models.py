from django_tenants.models import TenantMixin, DomainMixin
from django.db import models

class Client(TenantMixin):
    name = models.CharField(max_length=100)
    paid_until = models.DateField(null=True, blank=True)
    on_trial = models.BooleanField()
    created_on = models.DateField(auto_now_add=True)

    auto_create_schema = True  # penting agar schema otomatis dibuat saat save()

    @property
    def schema_urlconf(self):
        print(f"🧠 [DEBUG] schema_urlconf dipanggil untuk tenant: {self.schema_name}")
        return "xalorra.tenant_urls"

class Domain(DomainMixin):
    pass

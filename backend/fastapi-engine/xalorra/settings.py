import os
from pathlib import Path
from dotenv import load_dotenv
from urllib.parse import urlparse

# Load .env
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# =======================
# ✅ Keamanan & Debug
# =======================
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "your-default-fallback-secret")
DEBUG = True
ALLOWED_HOSTS = ['*']

# =======================
# ✅ Tenant Settings
# =======================
TENANT_MODEL = "customers.Client"
TENANT_DOMAIN_MODEL = "customers.Domain"

# =======================
# ✅ Installed Apps
# =======================
SHARED_APPS = [
    "django_tenants",  # harus pertama
    "customers",       # berisi Client & Domain
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.admin",
    "core",
]

TENANT_APPS = [
    # apps ini hanya aktif di dalam tenant schema
    "mlmodels",
    "rest_framework",
]

# 🔧 Gabungkan SHARED + TENANT apps tanpa duplikat
INSTALLED_APPS = list(SHARED_APPS) + [app for app in TENANT_APPS if app not in SHARED_APPS]

# =======================
# ✅ Middleware
# =======================
MIDDLEWARE = [
    'django_tenants.middleware.main.TenantMainMiddleware',  # harus paling atas setelah security
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# =======================
# ✅ URL & WSGI
# =======================
ROOT_URLCONF = 'xalorra.urls'
PUBLIC_SCHEMA_URLCONF = 'xalorra.urls'
WSGI_APPLICATION = 'xalorra.wsgi.application'

# =======================
# ✅ Database
# =======================
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    parsed = urlparse(DATABASE_URL)
    DATABASES = {
        'default': {
            'ENGINE': 'django_tenants.postgresql_backend',  # WAJIB
            'NAME': parsed.path[1:],
            'USER': parsed.username,
            'PASSWORD': parsed.password,
            'HOST': parsed.hostname,
            'PORT': parsed.port,
        }
    }
else:
    raise ValueError("❌ DATABASE_URL not set in .env")

# =======================
# ✅ Auth & Password
# =======================
AUTH_USER_MODEL = 'core.User'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# =======================
# ✅ Templates
# =======================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# =======================
# ✅ Static & Media
# =======================
STATIC_URL = '/static/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'uploads')
MEDIA_URL = '/media/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# =======================
# ✅ DRF Config
# =======================
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
}

# =======================
# ✅ Tenant Database Router
# =======================
DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)

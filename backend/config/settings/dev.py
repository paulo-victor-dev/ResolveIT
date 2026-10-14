from .base import *

# -------------------------------------

DEBUG = True

ALLOWED_HOSTS = [
    host.strip()
    for host in config("TRUSTED_HOSTS_DEV", default="").split(",")
    if host.strip()
]

# -------------------------------------

CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in config("TRUSTED_ORIGINS_DEV", default="").split(",")
    if origin.strip()
]

# -------------------------------------

SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"

# -------------------------------------

CSRF_COOKIE_SECURE = False
CSRF_COOKIE_SAMESITE = "Lax"
CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in config("TRUSTED_ORIGINS_DEV", default="").split(",")
    if origin.strip()
]

# -------------------------------------

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    },
}

# -------------------------------------

REST_FRAMEWORK = {
    **REST_FRAMEWORK,
    
    "DEFAULT_THROTTLE_CLASSES": [],
}

# -------------------------------------

import dj_database_url

from .base import *

# -------------------------------------

DEBUG = False

ALLOWED_HOSTS = [
    host.strip()
    for host in config("TRUSTED_HOSTS_PROD", default="").split(",")
    if host.strip()
]

# -------------------------------------

CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in config("TRUSTED_ORIGINS_PROD", default="").split(",")
    if origin.strip()
]

# -------------------------------------

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"

# -------------------------------------

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = "Lax"
CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in config("TRUSTED_ORIGINS_PROD", default="").split(",")
    if origin.strip()
]

# -------------------------------------

DATABASES = {
    "default": dj_database_url.config(default=config("DATABASE_URL"))
}

# -------------------------------------

REST_FRAMEWORK = {
    **REST_FRAMEWORK,
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}

# -------------------------------------

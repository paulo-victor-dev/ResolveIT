from django.contrib import admin
from django.urls import include, path

ADMIN_URLS = [
    path('admin/', admin.site.urls),
]

APPS_URLS = [
    path("", include("apps.accounts.urls")),
]

urlpatterns = ADMIN_URLS + APPS_URLS

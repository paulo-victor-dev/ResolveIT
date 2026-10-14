from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import LoginView, LogoutView, RefreshView, UserViewSet

router = DefaultRouter()
router.register(r"user", UserViewSet)

urlpatterns = [
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/token/refresh/", RefreshView.as_view(), name="token_refresh"),
] + router.urls

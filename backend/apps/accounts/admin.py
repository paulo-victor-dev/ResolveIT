from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    ordering = ("date_joined",)

    list_display = (
        "email", 
        "username", 
        "is_superuser",
        "is_staff",
        "is_active", 
        "date_joined"
    )

    search_fields = (
        "username", 
        "email"
    )

    list_filter = (
        "is_active", 
        "is_staff",
        "is_superuser"
    )

    readonly_fields = ("date_joined", "last_login")

    fieldsets = (
        ("Dados de acesso", {
            "fields": (
                "email",
                "password",
            )
        }),
        ("Informações pessoais", {
            "fields": (
                "username",
            )
        }),
        ("Permissões", {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),
        ("Datas importantes", {
            "fields": (
                "date_joined",
                "last_login",
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email",
                "username",
                "password1",
                "password2",
                "is_active",
                "is_staff",
            ),
        }),
    )

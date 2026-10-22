from rest_framework.permissions import SAFE_METHODS, BasePermission

from .models import User

class UserPermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False

        # Leitura liberada para qualquer usuário autenticado
        if request.method in SAFE_METHODS:
            return True

        # Escrita somente para admin
        return user.role == User.Role.ADMIN

    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.role == User.Role.ADMIN:
            # Admins não podem deletar a si mesmos
            if request.method == "DELETE" and obj.pk == request.user.pk:
                return False
            
            return True

        return obj.pk == user.pk

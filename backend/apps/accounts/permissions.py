from rest_framework.permissions import SAFE_METHODS, BasePermission


class UserPermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False

        # Leitura liberada para qualquer usuário autenticado
        if request.method in SAFE_METHODS:
            return True

        # Escrita somente para admin
        return user.is_superuser

    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.is_superuser:
            # Admins não podem deletar a si mesmos
            if request.method == "DELETE" and obj.pk == request.user.pk:
                return False
            
            return True

        return obj.pk == user.pk

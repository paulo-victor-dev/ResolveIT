from rest_framework.permissions import BasePermission

from ..accounts.models import User


class TicketPermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False

        # Técnicos não podem criar ou deletar chamados, apenas edita-los.
        if (
            user.role == User.Role.TECHNICIAN 
            and view.action in ["create", "destroy"]
            ):
                return False

        return user.role in [
            User.Role.ADMIN, 
            User.Role.TECHNICIAN, 
            User.Role.COMMON
        ]

    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.role == User.Role.COMMON:
            return obj.created_by == user
        
        if user.role == User.Role.TECHNICIAN:            
            return obj.assigned_to == user

        return user.role == User.Role.ADMIN

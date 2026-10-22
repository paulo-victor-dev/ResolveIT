from rest_framework import viewsets, filters

from django_filters.rest_framework import DjangoFilterBackend

from django.db.models import Count, Q

from .models import Ticket
from ..accounts.models import User
from .serializers import TicketSerializer
from .permissions import TicketPermission

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by("-id")
    serializer_class = TicketSerializer
    permission_classes = [TicketPermission]

    filter_backends = [
        DjangoFilterBackend, 
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    filterset_fields = ["status", "priority"]

    search_fields = [
        "title", 
        "description",
        "created_by",
        "assigned_to",
    ]
    
    ordering_fields = [
        "id",
        "title",
        "status",
        "priority",
        "created_at",
        "updated_at",
    ]

    def get_queryset(self):
        queryset = super().get_queryset()

        user = self.request.user

        if user.role == User.Role.COMMON:
            return queryset.filter(created_by=user.pk)

        if user.role == User.Role.TECHNICIAN:
            return queryset.filter(assigned_to=user.pk)
        
        if user.role == User.Role.ADMIN:
            return queryset

        return queryset.none()

    def perform_create(self, serializer):
        # Assim que um Ticket é criado, ele é atribuido automaticamente ao
        # Técnico que tiver com menos deles e ao usuário que o criou.
        less_tk_technician = (
            User.objects
            .filter(role=User.Role.TECHNICIAN)
            .annotate(ticket_count=Count(
                "tickets_assigned",
                filter=Q(
                    tickets_assigned__status__in=[
                        Ticket.StatusChoices.OPENED,
                        Ticket.StatusChoices.ASSINTING,
                    ]
                )
            ))
            .order_by("ticket_count", "id")
            .first()
        )

        save_kwargs = {
            "created_by": self.request.user,
        }

        if less_tk_technician is not None:
            save_kwargs["assigned_to"] = less_tk_technician

        serializer.save(**save_kwargs)

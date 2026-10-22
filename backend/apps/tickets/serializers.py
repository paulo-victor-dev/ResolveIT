from rest_framework import serializers

from .models import Ticket


class TicketSerializer(serializers.ModelSerializer): 
    status_display = serializers.CharField(
        source="get_status_display",
        read_only=True,
    )

    priority_display = serializers.CharField(
        source="get_priority_display",
        read_only=True,
    )

    created_by_username = serializers.CharField(
        source="created_by.username",
        read_only=True,
        allow_null=True,
    )

    assigned_to_username = serializers.CharField(
        source="assigned_to.username",
        read_only=True,
        allow_null=True,
    )

    created_at = serializers.DateTimeField(
        format="%d/%m/%Y %H:%M:%S",
        read_only=True
    )

    updated_at = serializers.DateTimeField(
        format="%d/%m/%Y %H:%M:%S",
        read_only=True
    )
    
    class Meta:
        model = Ticket
        fields = [
            "id",
            "title",
            "description",
            "status",
            "priority",
            "created_by",
            "assigned_to",
            "created_at",
            "updated_at",
            "status_display",
            "priority_display",
            "created_by_username",
            "assigned_to_username",
        ]

        read_only_fields = [
            "created_by",
            "assigned_to",
        ]

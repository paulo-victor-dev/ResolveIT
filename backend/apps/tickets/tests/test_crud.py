from django.urls import reverse

from apps.tickets.models import Ticket


def test_ticket_recieve_technecian_when_created(api_client, common_user, technician_user):
    api_client.force_authenticate(user=common_user)

    payload = {
        "title": "Teste Title",
        "description": "Teste Description"
    }

    response = api_client.post(
        reverse("ticket-list"),
        data=payload,
        format="json",
    )

    ticket = Ticket.objects.get(pk=response.data["id"])

    assert ticket.assigned_to == technician_user


def test_technician_if_less_tickets_recieve_the_next(api_client, common_user, technician_user, technician_user_2): 
    api_client.force_authenticate(user=common_user)

    payload = {
        "title": "Teste Title",
        "description": "Teste Description"
    }

    response_1 = api_client.post(
        reverse("ticket-list"),
        data=payload,
        format="json",
    )

    response_2 = api_client.post(
        reverse("ticket-list"),
        data=payload,
        format="json",
    )

    response_3 = api_client.post(
        reverse("ticket-list"),
        data=payload,
        format="json",
    )

    ticket_1 = Ticket.objects.get(pk=response_1.data["id"])
    ticket_2 = Ticket.objects.get(pk=response_2.data["id"])
    ticket_3 = Ticket.objects.get(pk=response_3.data["id"])

    assert ticket_1.assigned_to == technician_user
    assert ticket_2.assigned_to == technician_user_2
    assert ticket_3.assigned_to != technician_user_2

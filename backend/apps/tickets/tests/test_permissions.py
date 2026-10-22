from django.urls import reverse
from rest_framework import status


# Technician User
def test_technician_can_access_yours_tickets(api_client, technician_user, ticket):
    api_client.force_authenticate(user=technician_user)

    response = api_client.get(
        reverse("ticket-detail", args=[ticket.pk])
    )

    assert response.status_code == status.HTTP_200_OK


def test_technician_cannot_create_or_delete_tickets(api_client, technician_user, ticket):
    api_client.force_authenticate(user=technician_user)

    payload = {
        "title": "Teste Title",
        "description": "Teste Description",
    }

    response_create = api_client.post(
        reverse("ticket-list"),
        data=payload,
        format="json",
    )

    response_delete = api_client.delete(
        reverse("ticket-detail", kwargs={ "pk": ticket.pk })
    )

    assert response_create.status_code == status.HTTP_403_FORBIDDEN
    assert response_delete.status_code == status.HTTP_403_FORBIDDEN


def test_technician_cannot_access_tickets_that_isnt_yours(api_client, technician_user, ticket_2):
    api_client.force_authenticate(user=technician_user)

    response = api_client.get(
        reverse("ticket-detail", args=[ticket_2.pk])
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_technician_can_list_only_yours_tickets(api_client, technician_user, ticket, ticket_2):
    api_client.force_authenticate(user=technician_user)

    response = api_client.get(reverse("ticket-list"))

    assert response.status_code == status.HTTP_200_OK

    results = response.data["results"]

    returned_tickets = [
        ticket["id"] for ticket in results
    ]

    assert ticket.pk in returned_tickets
    assert ticket_2.pk not in returned_tickets

# Common User
def test_common_user_can_access_yours_tickets(api_client, common_user, ticket):
    api_client.force_authenticate(user=common_user)

    response = api_client.get(
        reverse("ticket-detail", args=[ticket.pk])
    )

    assert response.status_code == status.HTTP_200_OK


def test_common_user_cannot_access_tickets_that_isnt_created(api_client, common_user, ticket_2):
    api_client.force_authenticate(user=common_user)

    response = api_client.get(
        reverse("ticket-detail", args=[ticket_2.pk])
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND

def test_common_user_can_list_only_yours_tickets(api_client, common_user, ticket, ticket_2):
    api_client.force_authenticate(user=common_user)

    response = api_client.get(reverse("ticket-list"))

    assert response.status_code == status.HTTP_200_OK

    results = response.data["results"]

    returned_tickets = [
        ticket["id"] for ticket in results
    ]

    assert ticket.pk in returned_tickets
    assert ticket_2.pk not in returned_tickets

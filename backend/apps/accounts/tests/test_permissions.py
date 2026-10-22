from django.urls import reverse
from rest_framework import status


# Annonymous User Tests
def test_unauthenticated_user_cannot_access_view(api_client):
    response = api_client.get(reverse("user-list"))
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


# Admin User Tests
def test_admin_cannot_delete_yourself(api_client, admin_user):
    api_client.force_authenticate(user=admin_user)

    response = api_client.delete(
        reverse("user-detail", kwargs={"pk": admin_user.pk})
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN

# Common User Tests
def test_common_user_cannot_read_all_users(api_client, common_user, technician_user):
    api_client.force_authenticate(user=common_user)
    
    response = api_client.get(reverse("user-list"))
    
    assert response.status_code == status.HTTP_200_OK

    results = response.data["results"]

    assert len(results) == 1
    
    assert results[0]["id"] == common_user.pk


def test_common_user_only_read_yourself(api_client, common_user, technician_user):
    api_client.force_authenticate(user=common_user)
    
    response = api_client.get(reverse("user-detail", args=[common_user.pk]))
    
    assert response.status_code == status.HTTP_200_OK

    assert response.data["id"] == common_user.pk


def test_common_user_cannot_read_other_user(api_client, common_user, technician_user):
    api_client.force_authenticate(user=common_user)
        
    response = api_client.get(reverse("user-detail", args=[technician_user.pk]))
    
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_common_user_cannot_do_write_actions(api_client, common_user):
    api_client.force_authenticate(user=common_user)

    payload = {
        "email": "teste@teste.com",
        "username": "Teste",
        "password": "Strong-Test-Password"
    }

    response = api_client.post(
        reverse("user-list"),
        data=payload,
        format="json",
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN

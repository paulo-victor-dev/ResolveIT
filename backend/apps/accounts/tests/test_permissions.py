from django.urls import reverse
from rest_framework import status


# Annonymous User Tests
def test_unauthenticated_user_cannot_access_view(client):
    response = client.get(reverse("user-list"))
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


# Common User Tests
def test_common_user_cannot_read_all_users(client, common_user, staff_user):
    client.force_authenticate(user=common_user)
    
    response = client.get(reverse("user-list"))
    
    assert response.status_code == status.HTTP_200_OK

    results = response.data["results"]

    assert len(results) == 1
    
    assert results[0]["id"] == common_user.pk

def test_common_user_only_read_yourself(client, common_user, staff_user):
    client.force_authenticate(user=common_user)
    
    response = client.get(reverse("user-detail", args=[common_user.pk]))
    
    assert response.status_code == status.HTTP_200_OK

    assert response.data["id"] == common_user.pk

def test_common_user_cannot_read_other_user(client, common_user, staff_user):
    client.force_authenticate(user=common_user)
        
    response = client.get(reverse("user-detail", args=[staff_user.pk]))
    
    assert response.status_code == status.HTTP_404_NOT_FOUND

def test_common_user_cannot_do_write_actions(client, common_user):
    client.force_authenticate(user=common_user)

    payload = {
        "email": "teste@teste.com",
        "username": "Teste",
        "password": "Strong-Test-Password"
    }

    response = client.post(
        reverse("user-list"),
        data=payload,
        format="json",
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN

from pytest import fixture
from rest_framework.test import APIClient

from apps.accounts.models import User
from apps.tickets.models import Ticket


@fixture
def api_client():
    return APIClient()

@fixture
def admin_user(db):
    return User.objects.create_superuser(
        username="admin_user",
        email="admin_user@example.com",
        password="Strong-Test-Password-91!",
        role=User.Role.ADMIN,
    )

@fixture
def common_user(db):
    return User.objects.create_user(
        username="common_user",
        email="common_user@example.com",
        password="Strong-Test-Password-92!",
        role=User.Role.COMMON,
    )

@fixture
def common_user_2(db):
    return User.objects.create_user(
        username="common_user_2",
        email="common_user_2@example.com",
        password="Strong-Test-Password-92!",
        role=User.Role.COMMON,
    )

@fixture
def technician_user(db):
    return User.objects.create_user(
        username="technician_user",
        email="technician_user@example.com",
        password="Strong-Test-Password-93!",
        role=User.Role.TECHNICIAN,
    )

@fixture
def technician_user_2(db):
    return User.objects.create_user(
        username="technician_user_2",
        email="technician_user_2@example.com",
        password="Strong-Test-Password-93!",
        role=User.Role.TECHNICIAN,
    )

@fixture
def ticket(db, common_user, technician_user):
    return Ticket.objects.create(
        title="Teste Title",
        description="Teste Description",
        created_by=common_user,
        assigned_to=technician_user,
    )

@fixture
def ticket_2(db, common_user_2, technician_user_2):
    return Ticket.objects.create(
        title="Teste Title",
        description="Teste Description",
        created_by=common_user_2,
        assigned_to=technician_user_2,
    )

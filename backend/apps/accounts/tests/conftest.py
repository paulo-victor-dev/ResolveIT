from pytest import fixture
from rest_framework.test import APIClient

from apps.accounts.models import User


@fixture
def client():
    return APIClient()

@fixture
def common_user(db):
    return User.objects.create_user(
        email="common_user@example.com",
        username="common_user",
        password="Strong-Test-Password-91!"
    )

@fixture
def staff_user(db):
    return User.objects.create_user(
        email="staff_user@example.com",
        username="staff_user",
        password="Strong-Test-Password-92!",
        is_staff=True,
    )

@fixture
def super_user(db):
    return User.objects.create_superuser(
        email="super_user@example.com",
        username="super_user",
        password="Strong-Test-Password-93!",
    )

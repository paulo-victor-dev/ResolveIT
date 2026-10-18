from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        COMMON = "common", "Usuário"
        TECHNICIAN = "technician", "Técnico"
        ADMIN = "admin", "Administrador"

    username = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Nome de usuário"
    )

    email = models.EmailField(
        unique=True,
        verbose_name="E-mail"
    )

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.COMMON,
        verbose_name="Função"
    )

    is_active = models.BooleanField(
        default=True, 
        verbose_name="Status da Conta",
        help_text="Define se a conta desse usuário está ativa e pode ser utilizada para autenticação."
    )

    is_staff = models.BooleanField(
        default=False, 
        verbose_name="Membro",
        help_text="Permite que esse usuário acesse o painel de administração."
    )

    is_superuser = models.BooleanField(
        default=False, 
        verbose_name="Administrador",
        help_text="Concede a esse usuário todas as permissões disponíveis, sem a necessidade de atribuí-las individualmente."
    )

    date_joined = models.DateTimeField(
        default=timezone.now, 
        verbose_name="Data cadastro"
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    class Meta:
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"

    def __str__(self):
        return self.username or self.email

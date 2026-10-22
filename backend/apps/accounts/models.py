from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils import timezone

from .managers import UserManager


class User(AbstractBaseUser):
    class Role(models.TextChoices):
        ADMIN = "admin", "Administrador"   
        COMMON = "common", "Usuário"
        TECHNICIAN = "technician", "Técnico"

    username = models.CharField(
        max_length=100,
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
        verbose_name="Função",
        help_text="Determina a função que esse usuário desempenhará no sistema."
    )

    is_active = models.BooleanField(
        default=True, 
        verbose_name="Status da Conta",
        help_text="Define se a conta desse usuário está ativa e pode ser utilizada para autenticação."
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

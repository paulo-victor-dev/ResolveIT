from django.db import models

from ..accounts.models import User


class Ticket(models.Model):
    class StatusChoices(models.TextChoices):
        OPENED = "opened", "Aberto"
        ASSINTING = "assisting", "Em atendimento"
        FINISHED = "finished", "Finalizado"
    
    class PriorityChoices(models.IntegerChoices):
        HIGH = 1, "Alta"
        MEDIUM = 2, "Média"
        LOW = 3, "Baixa"

    title = models.CharField(
        max_length=120,
        verbose_name="Título"
    )

    description = models.TextField(
        max_length=600,
        verbose_name="Descrição"
    )

    status = models.CharField(
        max_length=20,
        choices=StatusChoices.choices,
        default=StatusChoices.OPENED,
        verbose_name="Status"
    )

    priority = models.CharField(
        max_length=20,
        choices=PriorityChoices.choices,
        default=PriorityChoices.LOW,
        verbose_name="Prioridade"
    )

    created_by = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        related_name="tickets_created",
        verbose_name="Criado por"
    )

    assigned_to = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        related_name="tickets_assigned",
        verbose_name="Atribuído a"
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Criado em"
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Atualizado em"
    )

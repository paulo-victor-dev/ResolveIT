from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False,
        validators=[validate_password],
    )

    is_active = serializers.BooleanField(
        read_only=True
    )

    date_joined = serializers.DateTimeField(
        format="%d/%m/%Y %H:%M:%S",
        read_only=True
    )

    last_login = serializers.DateTimeField(
        format="%d/%m/%Y %H:%M:%S",
        read_only=True
    )

    role_display = serializers.CharField(
        source="get_role_display",
        read_only=True,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "role",
            "role_display",
            "is_active",
            "date_joined",
            "last_login",
            "password"
        ]

    def get_fields(self):
        fields = super().get_fields()

        # Regra para exigir a senha somente na criação (POST)
        if self.instance is None:
            fields["password"].required = True

        return fields

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        return User.objects.update_user(instance, **validated_data)


class LoginSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        "no_active_account": "E-mail ou senha inválidos.",
    }

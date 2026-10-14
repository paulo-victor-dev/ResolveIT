from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import User
from .permissions import UserPermission
from .serializers import LoginSerializer, UserSerializer
from .tokens import token_payload


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserSerializer
    permission_classes = [UserPermission]

    filter_backends = [
        DjangoFilterBackend, 
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    filterset_fields = ["is_active"]

    search_fields = [
        "username", 
        "email"
    ]
    
    ordering_fields = [
        "id",
        "username",
        "email",
        "date_joined"
    ]

    @method_decorator(sensitive_post_parameters("password", "current_password"))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()

        user = self.request.user

        if user.is_superuser:
            return queryset

        return queryset.filter(pk=user.pk)
    

class LoginView(TokenObtainPairView):
    """
    Autentica por e-mail/senha e devolve os tokens no corpo da resposta.

    Quem grava o cookie é o servidor do Frontend (padrão BFF).
    """

    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    @method_decorator(sensitive_post_parameters("password"))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payload = token_payload(serializer.validated_data)
        payload["user"] = UserSerializer(serializer.user).data

        return Response(payload, status=status.HTTP_200_OK)


class RefreshView(TokenRefreshView):
    """
    Renova o access token a partir do refresh recebido no corpo.

    Com ROTATE_REFRESH_TOKENS e blacklist ativos, o refresh antigo é
    invalidado na hora. Duas chamadas simultâneas derrubam a sessão, então
    o servidor do Frontend precisa serializar a renovação.
    """

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payload = token_payload(serializer.validated_data)

        return Response(payload, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """Invalida o refresh token recebido no corpo (blacklist)."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh = request.data.get("refresh")

        if not refresh:
            return Response({"message": "Refresh token ausente."}, status=status.HTTP_400_BAD_REQUEST)

        # Token inválido ou já revogado também responde 200: distinguir os
        # casos entregaria um oráculo para testar tokens roubados.
        try:
            RefreshToken(refresh).blacklist()

        except TokenError:
            pass

        return Response(status=status.HTTP_204_NO_CONTENT)

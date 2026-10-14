from django.conf import settings


def lifetime_seconds(key):
    return int(settings.SIMPLE_JWT[key].total_seconds())


def token_payload(tokens):
    """
    Monta o corpo devolvido pelas rotas de autenticação.

    A API entrega o token e por quanto tempo ele vale; quem decide
    httpOnly, secure, sameSite e path é o servidor do Frontend, a partir da
    configuração dele.
    """
    payload = {
        "access": str(tokens["access"]),
        "access_expires_in": lifetime_seconds("ACCESS_TOKEN_LIFETIME"),
    }

    if tokens.get("refresh"):
        payload["refresh"] = str(tokens["refresh"])
        payload["refresh_expires_in"] = lifetime_seconds(
            "REFRESH_TOKEN_LIFETIME"
        )

    return payload

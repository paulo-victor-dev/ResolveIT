import os

from decouple import config
from django.core.asgi import get_asgi_application

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE', 
    str(config("DJANGO_SETTINGS_MODULE"))
)

application = get_asgi_application()

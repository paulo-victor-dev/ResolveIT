from rest_framework.routers import DefaultRouter

from .views import TicketViewSet


router = DefaultRouter()
router.register(r"ticket", TicketViewSet)

urlpatterns = router.urls

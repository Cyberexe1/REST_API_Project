from django.urls import path, include
from .views import DairyEntryview
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'dairyentry',DairyEntryview)

urlpatterns = [
    path('', include(router.urls)),
]
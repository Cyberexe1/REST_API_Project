from .models import DairyEntry
from rest_framework import viewsets
from .serializers import Dairyserializer

# Create your views here.
class DairyEntryview(viewsets.ModelViewSet):
    queryset = DairyEntry.objects.all()
    serializer_class = Dairyserializer
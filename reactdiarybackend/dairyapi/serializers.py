from rest_framework import serializers
from .models import DairyEntry

class Dairyserializer(serializers.ModelSerializer):
    class Meta:
        model = DairyEntry
        fields = ['id', 'title', 'content', 'mood', 'date','upload_date']
        read_only_fields = ['upload_date']
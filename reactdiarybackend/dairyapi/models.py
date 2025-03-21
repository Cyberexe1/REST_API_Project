from django.db import models

# Create your models here.
class DairyEntry(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(max_length=1000)
    mood = models.CharField(max_length=50)
    date = models.DateField()
    upload_date = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['-upload_date']
    
    def __str__(self):
        return self.title
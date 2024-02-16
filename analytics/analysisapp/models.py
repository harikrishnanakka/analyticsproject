from datetime import timezone
from django.db import models
from django.utils import timezone 

# Create your models here.
# dashboard_app/models.py


class DashboardData(models.Model):
    end_year = models.CharField(max_length=10, blank=True)
    intensity = models.IntegerField()
    sector = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    insight = models.CharField(max_length=255)
    url = models.URLField()
    region = models.CharField(max_length=300)
    start_year = models.CharField(max_length=10, blank=True)
    impact = models.CharField(max_length=255, blank=True)
    added = models.DateTimeField(default=timezone.now)
    published = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    country = models.CharField(max_length=100)
    relevance = models.IntegerField()
    pestle = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    title = models.CharField(max_length=800)
    likelihood = models.IntegerField()

    def __str__(self):
        return self.title


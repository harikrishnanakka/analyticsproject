from django.contrib import admin
from .models import DashboardData

class DashboardDataAdmin(admin.ModelAdmin):
    list_display = ('title', 'country', 'sector', 'relevance', 'added', 'published')
    search_fields = ('title', 'country', 'sector', 'source')
    list_filter = ('sector', 'relevance', 'added', 'published')

# Register your models with the custom admin class
admin.site.register(DashboardData, DashboardDataAdmin)

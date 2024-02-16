# dashboard_app/urls.py
from django.urls import path
from .views import DashboardDataList

urlpatterns = [
    path('dashboard/', DashboardDataList.as_view(), name='dashboard-list'),
]

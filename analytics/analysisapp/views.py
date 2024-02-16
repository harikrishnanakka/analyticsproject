# dashboard_app/views.py
from rest_framework import generics
from .models import DashboardData
from .models import DashboardData 
from .serializers import DashboardDataSerializer
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView

    # Your view logic here


class DashboardDataList(APIView):
    def get(self, request, *args, **kwargs):
        queryset = DashboardData.objects.all()
        serializer = DashboardDataSerializer(queryset, many=True)
        data = serializer.data

        return Response(data)
    


def index(request):
    return render(request, 'index.html')
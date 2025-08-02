from django.urls import path
from .views import predict_disease, prescribe_disease,HeartHealthAnalyzer


urlpatterns = [
    path('predict/', predict_disease, name='predict_disease'),
    path('prescribe/', prescribe_disease, name='prescribe_disease'),
    path('heart-health-analyzer/', HeartHealthAnalyzer.as_view(), name='heart_health_analyzer'),
]
    


from django.urls import path, include
from . import views

urlpatterns = [
    path('users/<int:pk>/', views.user_detail, name='user-detail'),
]
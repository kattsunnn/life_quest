from django.urls import path, include
from . import views
from .views import TodoAllView, TodoDetailView, HabitAllView, HabitDetailView

urlpatterns = [
    path('app/', views.index),
    path('users/<int:pk>/', views.user),
    path('todos/<int:pk>/', TodoDetailView.as_view()),
    path('todos/', TodoAllView.as_view()),
    path('habits/<int:pk>/', HabitDetailView.as_view()),
    path('habits/', HabitAllView.as_view()),
]


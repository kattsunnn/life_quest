from django.urls import path
from . import views
from .views import UserListView, UserDetailView, TodoListView, TodoDetailView, HabitListView, HabitDetailView, RewardListView, RewardDetailView,

urlpatterns = [
    path('users/<int:user_id>/todos/', TodoListView.as_view()),
    path('todos/<int:pk>/', TodoDetailView.as_view()),
    path('users/<int:user_id>/habits/', HabitListView.as_view()),
    path('habits/<int:pk>/', HabitDetailView.as_view()),
    path('users/<int:user_id>/rewards/', RewardListView.as_view()),
    path('rewards/<int:pk>/', RewardDetailView.as_view()),
    path('users/<int:pk>/', UserDetailView.as_view()),
    path('users/', UserListView.as_view()),


]


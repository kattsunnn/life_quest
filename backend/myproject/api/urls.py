from django.urls import path
from . import views
from .views import UserListView, UserDetailView
from .views import TodoListView, TodoDetailView
from .views import HabitListView, HabitDetailView
# from .views import RewardListView, RewardDetailView

urlpatterns = [
    path('users/<int:user_id>/todos/', TodoListView.as_view()),
    path('todos/<int:todo_id>/', TodoDetailView.as_view()),
    path('users/<int:user_id>/habits/', HabitListView.as_view()),
    path('habits/<int:habit_id>/', HabitDetailView.as_view()),
    # path('users/<int:user_id>/rewards/', RewardListView.as_view()),
    # path('rewards/<int:reward_id>/', RewardDetailView.as_view()),
    path('users/<int:user_id>/', UserDetailView.as_view()),
    path('users/', UserListView.as_view()),
]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TodoViewSet, HabitViewSet, RewardViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'todos', TodoViewSet, basename='todo')
router.register(r'habits', HabitViewSet, basename='habit')
router.register(r'rewards', RewardViewSet, basename='reward')

urlpatterns = [
    path('', include(router.urls)),
]
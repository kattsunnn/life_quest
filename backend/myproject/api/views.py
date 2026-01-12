from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from django.utils import timezone
import json
from .models import User, Todo, Habit, Reward
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers import UserCreateSerializer, UserGetSerializer, UserUpdateSerializer
from .serializers import TodoGetSerializer, TodoCreateSerializer, TodoUpdateSerializer
from .serializers import HabitGetSerializer, HabitCreateSerializer, HabitUpdateSerializer
from .serializers import RewardGetSerializer, RewardCreateSerializer, RewardUpdateSerializer

from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render(request, "index.html")

class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserGetSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response(
            UserGetSerializer(user).data,
            status=status.HTTP_201_CREATED
        )

class UserDetailView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        serializer = UserGetSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        serializer = UserUpdateSerializer(
            instance=user,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()

        return Response(
            UserGetSerializer(user).data,
            status=status.HTTP_200_OK
        )

    def delete(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        data = UserGetSerializer(user).data
        user.delete()
        return Response(data, status=status.HTTP_200_OK)
    
class TodoListView(APIView):
    def get(self, request, user_id):

        try:
            page = max(int(request.query_params.get('page', 1)), 1)
        except (TypeError, ValueError):
            page = 1
        try:
            limit = max(int(request.query_params.get('limit', 20)), 1)
        except (TypeError, ValueError):
            limit = 20

        today = timezone.localdate()
        today_todos = Todo.objects.filter(user_id=user_id, created_at__date=today).order_by('-created_at')

        offset = (page - 1) * limit
        past_todos = Todo.objects.filter(user_id=user_id).exclude(created_at__date=today).order_by('-updated_at')[offset:offset + limit]

        return Response({
            "today": TodoGetSerializer(today_todos, many=True).data,
            "past": TodoGetSerializer(past_todos, many=True).data,
            "page": page,
            "limit": limit
        }, status=status.HTTP_200_OK)

    def post(self, request, user_id):
        data = request.data.copy()
        data['user_id'] = user_id 
        serializer = TodoCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)  
        todo = serializer.save()  
        return Response(TodoGetSerializer(todo).data, status=status.HTTP_201_CREATED)

class TodoDetailView(APIView):

    def get(self, request, todo_id):
        todo = get_object_or_404(Todo, pk=todo_id)
        return Response(TodoGetSerializer(todo).data, status=status.HTTP_201_CREATED)

    def patch(self, request, todo_id):
        todo = get_object_or_404(Todo, pk=todo_id)
        serializer = TodoUpdateSerializer(
            todo,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        todo = serializer.save()
        return Response(
            TodoGetSerializer(todo).data,
            status=status.HTTP_200_OK
        )

    def delete(self, request, todo_id):
        todo = get_object_or_404(Todo, pk=todo_id)
        data = TodoGetSerializer(todo).data
        todo.delete()
        return Response(data, status=status.HTTP_200_OK)

class HabitListView(APIView):
    def get(self, request, user_id):
        try:
            page = max(int(request.query_params.get('page', 1)), 1)
        except (TypeError, ValueError):
            page = 1
        try:
            limit = max(int(request.query_params.get('limit', 20)), 1)
        except (TypeError, ValueError):
            limit = 20

        today = timezone.localdate()
        today_habits = Habit.objects.filter(user_id=user_id, created_at__date=today).order_by('-created_at')

        offset = (page - 1) * limit
        past_habits = Habit.objects.filter(user_id=user_id).exclude(created_at__date=today).order_by('-updated_at')[offset:offset + limit]

        return Response({
            "today": HabitGetSerializer(today_habits, many=True).data,
            "past": HabitGetSerializer(past_habits, many=True).data,
            "page": page,
            "limit": limit
        }, status=status.HTTP_200_OK)

    def post(self, request, user_id):
        data = request.data.copy()
        data['user_id'] = user_id
        serializer = HabitCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        habit = serializer.save()
        return Response(HabitGetSerializer(habit).data, status=status.HTTP_201_CREATED)

class HabitDetailView(APIView):
    def get(self, request, habit_id):
        habit = get_object_or_404(Habit, pk=habit_id)
        return Response(HabitGetSerializer(habit).data, status=status.HTTP_201_CREATED)

    def patch(self, request, habit_id):
        habit = get_object_or_404(Habit, pk=habit_id)
        serializer = HabitUpdateSerializer(
            habit,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        habit = serializer.save()
        return Response(
            HabitGetSerializer(habit).data, 
            status=status.HTTP_200_OK
        )
    
    def delete(self, request, habit_id):
        habit = get_object_or_404(Habit, pk=habit_id)
        data = HabitGetSerializer(habit).data
        habit.delete()
        return Response(data, status=status.HTTP_200_OK)

class RewardListView(APIView):
    def get(self, request, user_id):
        try:
            page = max(int(request.query_params.get('page', 1)), 1)
        except (TypeError, ValueError):
            page = 1
        try:
            limit = max(int(request.query_params.get('limit', 20)), 1)
        except (TypeError, ValueError):
            limit = 20

        today = timezone.localdate()
        today_rewards = Reward.objects.filter(user_id=user_id, created_at__date=today).order_by('-created_at')

        offset = (page - 1) * limit
        past_rewards = Reward.objects.filter(user_id=user_id).exclude(created_at__date=today).order_by('-updated_at')[offset:offset + limit]

        return Response({
            "today": RewardGetSerializer(today_rewards, many=True).data,
            "past": RewardGetSerializer(past_rewards, many=True).data,
            "page": page,
            "limit": limit
        }, status=status.HTTP_200_OK)

    def post(self, request, user_id):
        data = request.data.copy()
        data['user_id'] = user_id
        serializer = RewardCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        habit = serializer.save()
        return Response(RewardGetSerializer(habit).data, status=status.HTTP_201_CREATED)

class RewardDetailView(APIView):
    def get(self, request, reward_id):
        reward = get_object_or_404(Reward, pk=reward_id)
        return Response(RewardGetSerializer(reward).data, status=status.HTTP_201_CREATED)

    def patch(self, request, reward_id):
        reward = get_object_or_404(Reward, pk=reward_id)
        serializer = RewardUpdateSerializer(
            reward,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        reward = serializer.save()
        return Response(
            RewardGetSerializer(reward).data, 
            status=status.HTTP_200_OK
        )
    
    def delete(self, request, reward_id):
        reward = get_object_or_404(Reward, pk=reward_id)
        data = RewardGetSerializer(reward).data
        reward.delete()
        return Response(data, status=status.HTTP_200_OK)

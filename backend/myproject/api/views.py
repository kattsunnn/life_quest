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
from datetime import datetime

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

        completed = request.query_params.get('completed')
        completed_at = request.query_params.get('completed_at')
        completed_before = request.query_params.get('completed_before')
        sort = request.query_params.get('sort')
        page = request.query_params.get('page')
        limit = request.query_params.get('limit')
        # page / limit を安全に整数に変換
        try:
            page = int(request.query_params.get('page')) if request.query_params.get('page') is not None else None
        except (TypeError, ValueError):
            page = None
        try:
            limit = int(request.query_params.get('limit')) if request.query_params.get('limit') is not None else None
        except (TypeError, ValueError):
            limit = None

        todos = Todo.objects.filter(user_id=user_id)
        
        if completed == 'true':
            todos = todos.filter(is_completed=True)
        elif completed == 'false':
            todos = todos.filter(is_completed=False)

        if completed_at:
            try:
                date_obj = datetime.strptime(completed_at, '%Y-%m-%d').date()
                todos = todos.filter(completed_at__date=date_obj)
            except ValueError:
                pass
        
        if completed_before:
            try:
                date_obj = datetime.strptime(completed_before, '%Y-%m-%d').date()
                todos = todos.filter(completed_at__date__lt=date_obj)
            except ValueError:
                pass

        allowed_sorts = [
            'created_at',   '-created_at', 
            'updated_at',   '-updated_at',
            'completed_at', '-completed_at',
        ]
        if sort in allowed_sorts: 
            todos = todos.order_by(sort)
        else:
            todos = todos.order_by('-updated_at')

        if limit:
            current_page = page if page else 1
            offset = (current_page - 1) * limit
            todos = todos[offset : offset + limit]
        
        if limit == 0:
            return Response({"count":todos.count()})

        return Response(TodoGetSerializer(todos, many=True).data, status=status.HTTP_200_OK)

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

        habits = list(today_habits) + list(past_habits)

        return Response(HabitGetSerializer(habits, many=True).data, status=status.HTTP_200_OK)

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

        rewards = list(today_rewards) + list(past_rewards)

        return Response(RewardGetSerializer(rewards, many=True).data, status=status.HTTP_200_OK)

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

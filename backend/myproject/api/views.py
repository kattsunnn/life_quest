from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
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
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TodoListView(APIView):
    def get(self, request, user_id):
        todos = Todo.objects.filter(user_id=user_id)
        serializer = TodoGetSerializer(todos, many=True)
        return Response(serializer.data)

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
        habits = Habit.objects.filter(user_id=user_id)
        serializer = HabitGetSerializer(habits, many=True)
        return Response(serializer.data)

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

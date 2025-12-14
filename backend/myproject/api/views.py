from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import User, Todo, Habit, Reward
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render(request, "index.html")

@csrf_exempt
def user(request, pk):
    if request.method == 'GET':
        return get_user(request, pk)
    elif request.method == 'PATCH':
        return patch_user(request, pk)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return JsonResponse({'error': 'ユーザーが見つかりません'}, status=404)

    data = {
        'id': user.id,
        'name': user.name,
        'level': user.level,
        'exp': user.exp,
        'coins': user.coins,
        'tickets_peru': user.tickets_peru,
        'tickets_silver': user.tickets_silver,
        'tickets_gold': user.tickets_gold,
        'tickets_plum': user.tickets_plum,
        'created_at': user.created_at.isoformat(),
        'updated_at': user.updated_at.isoformat(),
    }
    return JsonResponse(data)

def patch_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return JsonResponse({'error': 'ユーザーが見つかりません'}, status=404)

    data = json.loads(request.body)

    if 'name' in data:
        user.name = data['name']
    if 'level' in data:
        user.level = data['level']
    if 'exp' in data:
        user.exp = data['exp']
    if 'coins' in data:
        user.coins = data['coins']
    if 'tickets_peru' in data:
        user.tickets_peru = data['tickets_peru']
    if 'tickets_silver' in data:
        user.tickets_silver = data['tickets_silver']
    if 'tickets_gold' in data:
        user.tickets_gold = data['tickets_gold']
    if 'tickets_plum' in data:
        user.tickets_plum = data['tickets_plum']

    user.save()

    response_data = {
        'id': user.id,
        'name': user.name,
        'level': user.level,
        'exp': user.exp,
        'coins': user.coins,
        'tickets_peru': user.tickets_peru,
        'tickets_silver': user.tickets_silver,
        'tickets_gold': user.tickets_gold,
        'tickets_plum': user.tickets_plum,
        'created_at': user.created_at.isoformat(),
        'updated_at': user.updated_at.isoformat(),
    }
    return JsonResponse(response_data)


class TodoAllView(APIView):
    def get(self, request):
        return get_todos(request)
    def post(self, request):
        return post_todo(request)

class TodoDetailView(APIView):
    def patch(self, request, pk):
        return patch_todo(request, pk)
    def delete(self, request, pk):
        return delete_todo(request, pk)

def todo_to_dict(todo):
    return {
        'id': todo.id,
        'user_id': todo.user_id,
        'name': todo.name,
        'difficulty': todo.difficulty,
        'reward': todo.reward,
        'memo': todo.memo,
        'is_completed': todo.is_completed,
        'created_at': todo.created_at.isoformat(),
        'updated_at': todo.updated_at.isoformat(),
    }

def get_todos(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'user_idが指定されていません'}, status=400)
    try:
        user_id = int(user_id)
    except ValueError:
        return JsonResponse({'error': '無効なuser_idです'}, status=400)
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return JsonResponse({'error': 'ユーザーが見つかりません'}, status=404)
    
    todos = Todo.objects.filter(user=user)
    res_data = { 'todos': [ todo_to_dict(todo) for todo in todos ] }
    return JsonResponse(res_data)

def post_todo(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': '無効なJSONです'}, status=400)
    
    user_id = data.get('user_id')
    name = data.get('name')

    if not user_id:
        return JsonResponse({'error': 'user_idが指定されていません'}, status=400)
    if not name:
        return JsonResponse({'error': 'nameが指定されていません'}, status=400)
    
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return JsonResponse({'error': 'ユーザーが見つかりません'}, status=404)
    
    todo = Todo.objects.create(
        user=user,
        name=name,
        difficulty=data.get('difficulty', 1),
        reward=data.get('reward', 1),
        memo=data.get('memo', ''),
    )
    res_data = todo_to_dict(todo)
    return JsonResponse(res_data, status=201)

def patch_todo(request, pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return JsonResponse({})
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': '無効なJSONです'}, status=400)

    if 'name' in data:
        todo.name = data['name']
    if 'difficulty' in data:
        todo.difficulty = data['difficulty']
    if 'reward' in data:
        todo.reward = data['reward']
    if 'memo' in data:
        todo.memo = data['memo']
    if 'is_completed' in data:
        todo.is_completed = data['is_completed']

    todo.save()

    res_data = todo_to_dict(todo)
    return JsonResponse(res_data, status=201)

def delete_todo(request, pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return JsonResponse({'error': 'Todoが見つかりません'}, status=404)
    res_data = todo_to_dict(todo)
    todo.delete()
    return JsonResponse(res_data, status=201)


class HabitAllView(APIView):
    def get(self, request):
        return get_habits(request)
    def post(self, request):
        return post_habit(request)

class HabitDetailView(APIView):
    def patch(self, request, pk):
        return patch_habit(request, pk)
    def delete(self, request, pk):
        return delete_habit(request, pk)

def habit_to_dict(habit):
    return {
        'id': habit.id,
        'user_id': habit.user_id,
        'name': habit.name,
        'difficulty': habit.difficulty,
        'reward': habit.reward,
        'memo': habit.memo,
        'is_completed': habit.is_completed,
        'created_at': habit.created_at.isoformat(),
        'updated_at': habit.updated_at.isoformat(),
    }

def get_habits(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'user_idが指定されていません'}, status=400)
    try:
        user_id = int(user_id)
    except ValueError:
        return JsonResponse({'error': '無効なuser_idです'}, status=400)
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return JsonResponse({'error': 'ユーザーが見つかりません'}, status=404)
    
    habits = Habit.objects.filter(user=user)
    res_data = { 'habits': [ habit_to_dict(habit) for habit in habits ] }
    return JsonResponse(res_data)

def post_habit(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': '無効なJSONです'}, status=400)
    
    user_id = data.get('user_id')
    name = data.get('name')

    if not user_id:
        return JsonResponse({'error': 'user_idが指定されていません'}, status=400)
    if not name:
        return JsonResponse({'error': 'nameが指定されていません'}, status=400)
    
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return JsonResponse({'error': 'ユーザーが見つかりません'}, status=404)
    
    habit = Habit.objects.create(
        user=user,
        name=name,
        difficulty=data.get('difficulty', 1),
        reward=data.get('reward', 1),
        memo=data.get('memo', ''),
    )
    res_data = habit_to_dict(habit)
    return JsonResponse(res_data, status=201)

def patch_habit(request, pk):
    try:
        habit = Habit.objects.get(pk=pk)
    except Habit.DoesNotExist:
        return JsonResponse({})
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': '無効なJSONです'}, status=400)

    if 'name' in data:
        habit.name = data['name']
    if 'difficulty' in data:
        habit.difficulty = data['difficulty']
    if 'reward' in data:
        habit.reward = data['reward']
    if 'memo' in data:
        habit.memo = data['memo']
    if 'is_completed' in data:
        habit.is_completed = data['is_completed']

    habit.save()

    res_data = habit_to_dict(habit)
    return JsonResponse(res_data, status=201)

def delete_habit(request, pk):
    try:
        habit = Habit.objects.get(pk=pk)
    except Habit.DoesNotExist:
        return JsonResponse({'error': 'Habitが見つかりません'}, status=404)
    res_data = habit_to_dict(habit)
    habit.delete()
    return JsonResponse(res_data, status=201)

from django.contrib import admin
from .models import User, Todo, Habit, Reward

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'level', 'coins', 'exp', 'created_at']
    search_fields = ['name']
    list_filter = ['level']
    ordering = ['id']


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'user', 'difficulty', 'reward', 'is_completed', 'updated_at']
    list_filter = ['is_completed', 'difficulty', 'user']
    search_fields = ['name']
    date_hierarchy = 'created_at'
    ordering = ['-updated_at']


@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'user', 'difficulty', 'reward', 'is_completed',  'updated_at']
    list_filter = ['difficulty', 'user']
    search_fields = ['name']
    date_hierarchy = 'created_at'
    ordering = ['-updated_at']


@admin.register(Reward)
class RewardAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'user', 'price', 'created_at']
    list_filter = ['user', 'price']
    search_fields = ['name']
    date_hierarchy = 'created_at'
    ordering = ['price']
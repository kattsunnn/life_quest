from django.db import models
from django.utils import timezone

class User(models.Model):
    name = models.CharField(max_length=100)
    coins = models.IntegerField(default=0)
    exp = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    ticket_peru = models.IntegerField(default=0)
    ticket_silver = models.IntegerField(default=0)
    ticket_gold = models.IntegerField(default=0)
    ticket_plum = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    name = models.CharField(max_length=100)
    difficulty = models.IntegerField(default=1)
    reward = models.IntegerField(default=1)
    memo = models.TextField(blank=True, default='')
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name


class Habit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    name = models.CharField(max_length=100)
    difficulty = models.IntegerField(default=1)
    reward = models.IntegerField(default=1)
    memo = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name


class Reward(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rewards')
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    memo = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name
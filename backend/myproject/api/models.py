from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

class User(models.Model):
    name = models.CharField(max_length=100)
    coins = models.IntegerField(default=0)
    exp = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    tickets_peru = models.IntegerField(default=0)
    tickets_silver = models.IntegerField(default=0)
    tickets_gold = models.IntegerField(default=0)
    tickets_plum = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return self.name

class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    name = models.CharField(max_length=100)
    difficulty = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(5)])
    reward = models.IntegerField(default=1, validators=[MinValueValidator(1),])
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
    difficulty = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(5)])
    reward = models.IntegerField(default=1, validators=[MinValueValidator(1),])
    memo = models.TextField(blank=True, default='')
    monday = models.BooleanField(default=False)
    tuseday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name


class Reward(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rewards')
    name = models.CharField(max_length=100)
    difficulty = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(5)])
    price = models.IntegerField(default=1, validators=[MinValueValidator(1),])
    memo = models.TextField(blank=True, default='')
    is_purchased = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name
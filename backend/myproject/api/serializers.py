from rest_framework import serializers
from .models import User, Todo, Habit, Reward

class UserCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    level = serializers.IntegerField(default=1)
    exp = serializers.IntegerField(default=0)
    coins = serializers.IntegerField(default=0)
    tickets_very_hard = serializers.IntegerField(default=0)
    tickets_hard = serializers.IntegerField(default=0)
    tickets_normal = serializers.IntegerField(default=0)
    tickets_easy = serializers.IntegerField(default=0)
    tickets_very_easy = serializers.IntegerField(default=0)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

class UserGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    level = serializers.IntegerField()
    exp = serializers.IntegerField()
    coins = serializers.IntegerField()
    tickets_very_hard = serializers.IntegerField()
    tickets_hard = serializers.IntegerField()
    tickets_normal = serializers.IntegerField()
    tickets_easy = serializers.IntegerField()
    tickets_very_easy = serializers.IntegerField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

class UserUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    level = serializers.IntegerField(required=False)
    exp = serializers.IntegerField(required=False)
    coins = serializers.IntegerField(required=False)
    tickets_very_hard = serializers.IntegerField(required=False)
    tickets_hard = serializers.IntegerField(required=False)
    tickets_normal = serializers.IntegerField(required=False)
    tickets_easy = serializers.IntegerField(required=False)
    tickets_very_easy = serializers.IntegerField(required=False)

    def validate(self, attrs):
        errors = {}
        for field in (
            "level",
            "exp",
            "coins",
            "tickets_very_hard",
            "tickets_hard",
            "tickets_normal",
            "tickets_easy",
            "tickets_very_easy",
        ):
            v = attrs.get(field)
            if v is not None and v < 0:
                errors[field] = "値は0以上である必要があります"
        if errors:
            raise serializers.ValidationError(errors)
        return attrs

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class TodoGetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    difficulty = serializers.IntegerField(read_only=True)
    reward = serializers.IntegerField(read_only=True)
    memo = serializers.CharField(read_only=True)
    is_completed = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)


class TodoCreateSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()  # URL で受け取った user_id
    name = serializers.CharField(max_length=100)
    difficulty = serializers.IntegerField(default=1)
    reward = serializers.IntegerField(default=1)
    memo = serializers.CharField(allow_blank=True, required=False)

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("ユーザーが存在しません")
        return value

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        user = User.objects.get(id=user_id)
        return Todo.objects.create(user=user, **validated_data)
    
class TodoUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    difficulty = serializers.IntegerField(required=False)
    reward = serializers.IntegerField(required=False)
    memo = serializers.CharField(required=False, allow_blank=True)
    is_completed = serializers.BooleanField(required=False)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class HabitGetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    difficulty = serializers.IntegerField(read_only=True)
    reward = serializers.IntegerField(read_only=True)
    memo = serializers.CharField(read_only=True)
    monday = serializers.BooleanField(read_only=True)
    tuesday = serializers.BooleanField(read_only=True)
    wednesday = serializers.BooleanField(read_only=True)
    thursday = serializers.BooleanField(read_only=True)
    friday = serializers.BooleanField(read_only=True)
    saturday = serializers.BooleanField(read_only=True)
    sunday = serializers.BooleanField(read_only=True)
    is_completed = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

class HabitCreateSerializer(serializers.Serializer):
    user_id = serializers.IntegerField() 
    name = serializers.CharField(max_length=100)
    difficulty = serializers.IntegerField(default=1)
    reward = serializers.IntegerField(default=1)
    memo = serializers.CharField(allow_blank=True, required=False)
    monday = serializers.BooleanField(default=False)
    tuesday = serializers.BooleanField(default=False)
    wednesday = serializers.BooleanField(default=False)
    thursday = serializers.BooleanField(default=False)
    friday = serializers.BooleanField(default=False)
    saturday = serializers.BooleanField(default=False)
    sunday = serializers.BooleanField(default=False)

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("ユーザーが存在しません")
        return value

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        user = User.objects.get(id=user_id)
        return Habit.objects.create(user=user, **validated_data)

class HabitUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    difficulty = serializers.IntegerField(required=False)
    reward = serializers.IntegerField(required=False)
    memo = serializers.CharField(required=False, allow_blank=True)
    monday = serializers.BooleanField(required=False)
    tuesday = serializers.BooleanField(required=False)
    wednesday = serializers.BooleanField(required=False)
    thursday = serializers.BooleanField(required=False)
    friday = serializers.BooleanField(required=False)
    saturday = serializers.BooleanField(required=False)
    sunday = serializers.BooleanField(required=False)
    is_completed = serializers.BooleanField(required=False)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
class RewardGetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    difficulty = serializers.IntegerField(read_only=True)
    price = serializers.IntegerField(read_only=True)
    memo = serializers.CharField(read_only=True)
    is_purchased = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

class RewardCreateSerializer(serializers.Serializer):
    user_id = serializers.IntegerField() 
    name = serializers.CharField(max_length=100)
    difficulty = serializers.IntegerField(default=1)
    price = serializers.IntegerField(default=1)
    memo = serializers.CharField(allow_blank=True, required=False)

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("ユーザーが存在しません")
        return value

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        user = User.objects.get(id=user_id)
        return Reward.objects.create(user=user, **validated_data)

class RewardUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    difficulty = serializers.IntegerField(required=False)
    price = serializers.IntegerField(required=False)
    memo = serializers.CharField(required=False, allow_blank=True)
    is_purchased = serializers.BooleanField(required=False)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
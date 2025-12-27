from rest_framework import serializers
from models import Todo, User

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
    user_id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    difficulty = serializers.IntegerField(default=1)
    reward = serializers.IntegerField(default=1)
    memo = serializers.CharField(allow_blank=True, required=False)

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("ユーザーが存在しません")
        return value

    def create(self, validated_data):
        user_id = validated_data.pop("user_id")
        user = User.objects.get(id=user_id)
        return Todo.objects.create(user=user, **validated_data)
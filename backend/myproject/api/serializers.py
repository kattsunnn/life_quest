from rest_framework import serializers
from .models import User, Todo, Habit, Reward


class UserSerializer(serializers.ModelSerializer):
    total_tickets = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'name', 'level', 'exp', 'coins',
            'ticket_peru', 'ticket_silver', 'ticket_gold', 'ticket_plum',
            'total_tickets',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_total_tickets(self, obj):
        """全チケットの合計"""
        return obj.ticket_peru + obj.ticket_silver + obj.ticket_gold + obj.ticket_plum


class TodoSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True, required=False)
    status_text = serializers.SerializerMethodField()
    
    class Meta:
        model = Todo
        fields = [
            'id', 'user', 'user_id', 'name', 'difficulty',
            'reward', 'memo', 'is_completed', 'status_text',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {'user': {'read_only': True}}
    
    def get_status_text(self, obj):
        """ステータステキスト"""
        return "完了" if obj.is_completed else "未完了"
    
    def create(self, validated_data):
        user_id = validated_data.pop('user_id', None)
        if user_id:
            validated_data['user_id'] = user_id
        return super().create(validated_data)
    
    def validate_difficulty(self, value):
        """難易度のバリデーション"""
        if value < 1 or value > 5:
            raise serializers.ValidationError("難易度は1-5の範囲で設定してください")
        return value
    
    def validate_reward(self, value):
        """報酬のバリデーション"""
        if value < 1:
            raise serializers.ValidationError("報酬は1以上で設定してください")
        return value
    
    def validate_name(self, value):
        """タスク名のバリデーション"""
        if not value or value.strip() == "":
            raise serializers.ValidationError("タスク名を入力してください")
        return value


class HabitSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = Habit
        fields = [
            'id', 'user', 'user_id', 'name', 'difficulty',
            'reward', 'memo', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {'user': {'read_only': True}}
    
    def create(self, validated_data):
        user_id = validated_data.pop('user_id', None)
        if user_id:
            validated_data['user_id'] = user_id
        return super().create(validated_data)
    
    def validate_difficulty(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("難易度は1-5の範囲で設定してください")
        return value
    
    def validate_reward(self, value):
        if value < 1:
            raise serializers.ValidationError("報酬は1以上で設定してください")
        return value


class RewardSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = Reward
        fields = [
            'id', 'user', 'user_id', 'name', 'price',
            'memo', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {'user': {'read_only': True}}
    
    def create(self, validated_data):
        user_id = validated_data.pop('user_id', None)
        if user_id:
            validated_data['user_id'] = user_id
        return super().create(validated_data)
    
    def validate_price(self, value):
        if value < 1:
            raise serializers.ValidationError("価格は1以上で設定してください")
        return value
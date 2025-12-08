from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Todo, Habit, Reward
from .serializers import UserSerializer, TodoSerializer, HabitSerializer, RewardSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    ユーザーのCRUD操作
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['patch'])
    def add_coins(self, request, pk=None):
        """コインを追加"""
        user = self.get_object()
        amount = request.data.get('amount', 0)
        user.coins += amount
        user.save()
        serializer = self.get_serializer(user)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def sub_coins(self, request, pk=None):
        """コインを減らす"""
        user = self.get_object()
        amount = request.data.get('amount', 0)
        if user.coins >= amount:
            user.coins -= amount
            user.save()
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'コインが不足しています'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['patch'])
    def add_exp(self, request, pk=None):
        """経験値を追加"""
        user = self.get_object()
        amount = request.data.get('amount', 0)
        user.exp += amount
        
        # レベルアップ処理（例：100経験値でレベルアップ）
        while user.exp >= 100:
            user.exp -= 100
            user.level += 1
        
        user.save()
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class TodoViewSet(viewsets.ModelViewSet):
    """
    Todoのクエリ操作
    """
    serializer_class = TodoSerializer
    
    def get_queryset(self):
        """user_idでフィルター可能"""
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Todo.objects.filter(user_id=user_id)
        return Todo.objects.all()
    
    @action(detail=True, methods=['patch'])
    def toggle_complete(self, request, pk=None):
        """完了状態を切り替え"""
        todo = self.get_object()
        todo.is_completed = not todo.is_completed
        todo.save()
        serializer = self.get_serializer(todo)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Todoを完了してコイン・経験値を付与"""
        todo = self.get_object()
        
        if todo.is_completed:
            return Response(
                {'error': 'すでに完了しています'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # 完了処理
        todo.is_completed = True
        todo.save()
        
        # ユーザーに報酬を付与
        user = todo.user
        user.coins += todo.reward
        user.exp += todo.difficulty * 10  # 難易度×10の経験値
        
        # レベルアップ処理
        while user.exp >= 100:
            user.exp -= 100
            user.level += 1
        
        user.save()
        
        serializer = self.get_serializer(todo)
        return Response(serializer.data)


class HabitViewSet(viewsets.ModelViewSet):
    """
    習慣のCRUD操作
    """
    serializer_class = HabitSerializer
    
    def get_queryset(self):
        """user_idでフィルター可能"""
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Habit.objects.filter(user_id=user_id)
        return Habit.objects.all()
    
    @action(detail=True, methods=['post'])
    def check_in(self, request, pk=None):
        """習慣をチェックインしてコイン・経験値を付与"""
        habit = self.get_object()
        user = habit.user
        
        # 報酬付与
        user.coins += habit.reward
        user.exp += habit.difficulty * 5  # 難易度×5の経験値
        
        # レベルアップ処理
        while user.exp >= 100:
            user.exp -= 100
            user.level += 1
        
        user.save()
        
        serializer = self.get_serializer(habit)
        return Response({
            'habit': serializer.data,
            'user': UserSerializer(user).data,
            'message': f'{habit.reward}コインと{habit.difficulty * 5}経験値を獲得しました'
        })


class RewardViewSet(viewsets.ModelViewSet):
    """
    ご褒美のCRUD操作
    """
    serializer_class = RewardSerializer
    
    def get_queryset(self):
        """user_idでフィルター可能"""
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Reward.objects.filter(user_id=user_id)
        return Reward.objects.all()
    
    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        """ご褒美を購入（コインを消費）"""
        reward = self.get_object()
        user = reward.user
        
        if user.coins < reward.price:
            return Response(
                {'error': f'コインが不足しています（必要: {reward.price}, 所持: {user.coins}）'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # コインを消費
        user.coins -= reward.price
        user.save()
        
        serializer = self.get_serializer(reward)
        return Response({
            'reward': serializer.data,
            'user': UserSerializer(user).data,
            'message': f'{reward.name}を購入しました'
        })
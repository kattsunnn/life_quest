from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import User


# ===== ユーザー詳細取得（GETのみ） =====
@csrf_exempt
@require_http_methods(["GET"])
def user_detail(request, pk):

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
    
    # ④ 辞書 → JSON
    return JsonResponse(data)
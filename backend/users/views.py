from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def admin_login(request):
    login_value = request.data.get('login')
    password = request.data.get('password')
    
    if not login_value or not password:
        return Response({
            'success': False,
            'error': 'Логин и пароль обязательны'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Пытаемся найти пользователя по email или username
    user = None
    try:
        # Сначала по email (без учета регистра)
        user = User.objects.get(email__iexact=login_value)
    except User.DoesNotExist:
        try:
            # Затем по username
            user = User.objects.get(username=login_value)
        except User.DoesNotExist:
            pass
    
    # Проверяем пароль, если пользователь найден
    if user and user.check_password(password):
        if user.is_admin or user.is_staff or user.is_superuser:
            login(request, user)
            return Response({
                'success': True,
                'message': 'Вход выполнен успешно',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'is_admin': user.is_admin or user.is_staff
                }
            })
        else:
            return Response({
                'success': False,
                'error': 'Доступ запрещен. Только для администраторов.'
            }, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({
            'success': False,
            'error': 'Неверный логин или пароль'
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'POST'])
def admin_logout(request):
    """Выход из админ-панели"""
    logout(request)
    return Response({
        'success': True,
        'message': 'Выход выполнен успешно'
    })

@api_view(['GET'])
def check_admin_status(request):
    """Проверка статуса админа"""
    if request.user.is_authenticated and (request.user.is_admin or request.user.is_staff or request.user.is_superuser):
        return Response({
            'is_admin': True,
            'username': request.user.username
        })
    return Response({
        'is_admin': False
    }, status=status.HTTP_401_UNAUTHORIZED)
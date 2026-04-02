from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.admin_login, name='admin-login'),  # Эндпоинт для входа
    path('logout/', views.admin_logout, name='admin-logout'),
    path('check/', views.check_admin_status, name='check-admin'),
]
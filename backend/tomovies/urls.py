from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list, name='movie-list'),
    path('<int:pk>/', views.movie_detail, name='movie-detail'),
    path('halls/', views.hall_list, name='hall-list'),
    path('halls/<int:pk>/', views.hall_detail, name='hall-detail'),
    path('sessions/', views.session_list, name='session-list'),
    path('sessions/<int:pk>/', views.session_detail, name='session-detail'),
    path('prices/', views.price_list, name='price-list'),
    path('prices/<int:pk>/', views.price_detail, name='price-detail'),
    path('halls/<int:pk>/config/', views.hall_config, name='hall-config'),
    path('halls/<int:pk>/prices/', views.hall_prices, name='hall-prices'),
    path('halls/<int:pk>/toggle-sales/', views.hall_toggle_sales, name='hall-toggle-sales'),
]
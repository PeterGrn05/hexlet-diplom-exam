from django.urls import path
from . import views

urlpatterns = [
    path('', views.booking_list, name='booking-list'),
    path('<int:pk>/', views.booking_detail, name='booking-detail'),
    path('<int:pk>/confirm/', views.confirm_booking, name='confirm-booking'),
    path('by-session/<int:session_id>/', views.bookings_by_session, name='bookings-by-session'),
]
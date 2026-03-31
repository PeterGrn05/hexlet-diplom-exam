from rest_framework import serializers
from .models import Booking
from tomovies.serializers import SessionSerializer

class BookingSerializer(serializers.ModelSerializer):
    session_details = SessionSerializer(source='session', read_only=True)
    
    class Meta:
        model = Booking
        fields = '__all__'
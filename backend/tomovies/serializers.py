from rest_framework import serializers
from .models import Movie, Hall, Session, Price

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    movie_name = serializers.ReadOnlyField(source='movie.name')
    hall_name = serializers.ReadOnlyField(source='hall.name')
    
    class Meta:
        model = Session
        fields = '__all__'

class PriceSerializer(serializers.ModelSerializer):
    session_info = SessionSerializer(source='session', read_only=True)
    
    class Meta:
        model = Price
        fields = '__all__'
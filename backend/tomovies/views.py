from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Movie, Hall, Session, Price
from .serializers import MovieSerializer, HallSerializer, SessionSerializer, PriceSerializer

# Movie views
@api_view(['GET', 'POST'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def movie_detail(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    
    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Hall views
@api_view(['GET', 'POST'])
def hall_list(request):
    if request.method == 'GET':
        halls = Hall.objects.all()
        serializer = HallSerializer(halls, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = HallSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def hall_detail(request, pk):
    hall = get_object_or_404(Hall, pk=pk)
    
    if request.method == 'GET':
        serializer = HallSerializer(hall)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = HallSerializer(hall, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        hall.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Session views
@api_view(['GET', 'POST'])
def session_list(request):
    if request.method == 'GET':
        sessions = Session.objects.all()
        serializer = SessionSerializer(sessions, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = SessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def session_detail(request, pk):
    session = get_object_or_404(Session, pk=pk)
    
    if request.method == 'GET':
        serializer = SessionSerializer(session)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = SessionSerializer(session, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        session.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Price views
@api_view(['GET', 'POST'])
def price_list(request):
    if request.method == 'GET':
        prices = Price.objects.all()
        serializer = PriceSerializer(prices, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = PriceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def price_detail(request, pk):
    price = get_object_or_404(Price, pk=pk)
    
    if request.method == 'GET':
        serializer = PriceSerializer(price)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = PriceSerializer(price, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        price.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
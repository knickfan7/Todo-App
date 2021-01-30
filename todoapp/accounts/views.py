from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view


from knox.models import AuthToken

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
# Create your views here.

@api_view(['GET'])
def user_view(request, *args, **kwargs):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def register_view(request, *args, **kwargs): 
    permission_classes = [
        permissions.IsAuthenticated,
    ]   
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
        "user": UserSerializer(user, context={'request': request}).data,
        "token": AuthToken.objects.create(user)[1]
    })
        
@api_view(['GET', 'POST'])
def login_view(request, *args, **kwargs):
    permission_classes = [
        permissions.IsAuthenticated,
    ]   
    
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    
    return Response({
        "user": UserSerializer(user, context={'request': request}).data,
        "token": AuthToken.objects.create(user)[1]
    })
    
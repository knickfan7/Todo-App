from django.shortcuts import render
from django.db import models
from .serializers import TodoSerializer
from .models import Todo

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions

# Create your views here.

@api_view(['GET'])
def get_todos(request, *args, **kwargs):
    permission_classes = [permissions.IsAuthenticated]
    qs = Todo.objects.filter(owner=request.user)
    serializer = TodoSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def add_todo(request, *args, **kwargs):
    serializer = TodoSerializer(data=request.data)
    
    if serializer.is_valid():
        '''On save, update user'''
        serializer.save(owner=request.user)
        qs = Todo.objects.filter(owner=request.user)
        serializer = TodoSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def delete_todo(request, id, *args, **kwargs):

    instance = Todo.objects.all().filter(id=id)
    instance.delete()
    qs = Todo.objects.filter(owner=request.user)

    serializer = TodoSerializer(qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def update_todo(request, *args, **kwargs):
    instance = Todo.objects.get(id=request.data['id'])
    instance.task = request.data['changes']['task']
    instance.description = request.data['changes']['description']
    instance.save()
    
    qs = Todo.objects.filter(owner=request.user)
    serializer = TodoSerializer(qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

    
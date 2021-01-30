from rest_framework import serializers
from .models import Todo
from django.conf import settings
from django.utils import timezone

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'owner', 'task', 'description', 'created']

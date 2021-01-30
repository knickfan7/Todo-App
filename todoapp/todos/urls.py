from django.contrib import admin
from django.urls import path
from todos.views import (
    add_todo,
    get_todos,
    delete_todo, 
    update_todo
)

urlpatterns = [
    path('todos/', get_todos),
    path('add/', add_todo),
    path('delete/<int:id>/', delete_todo),
    path('edit/<str:task>/', update_todo)
]
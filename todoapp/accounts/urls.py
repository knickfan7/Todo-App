
# accounts/api/urls.py

from django.urls import path, include

from knox.views import LogoutView

from .views import (
    login_view,
    register_view,
    user_view
)

urlpatterns = [
    path('', include('knox.urls')),
    path('user/', user_view),
    path('register/', register_view),
    path('logins/', login_view),
    path('logout/', LogoutView.as_view(), name='knox_logout')
]
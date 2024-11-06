from django.urls import path
from .views import login_view, register

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
]

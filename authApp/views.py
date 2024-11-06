# from carts.views import _cart_id
# from carts.models import Cart, CartItem
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib import messages


# http requests
def register(request):
    # return render(request)
    return "register"


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Log the user in
            login(request, user)
            messages.success(request, 'You have successfully logged in.')
            return redirect('home')  # Redirect to a success page or home
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'login.html')  # Render the login template

from django.http import HttpResponse


# from itertools import product
# from django.shortcuts import render


# from store.models import Product, ReviewRating


# def home(request):
#     HttpResponse('header.html')

def home(request):
    HttpResponse('<h2>hamza test</h2>')
    # products = Product.objects.all().filter(is_available=True).order_by('created_date')
    # Get the reviews
    # reviews = None
    # for product in products:
    #     reviews = ReviewRating.objects.filter(product_id=product.id, status=True)
    # context = {
    #     'products': products,
    #     'reviews': reviews,
    # }
    # return render(request, 'home.html', context)

# Example of a receiver function
# def honeypot_receiver(instance, request, **kwargs):
#     # Your logic here
#     pass
#
# # Connecting the receiver to the signal
# honeypot.connect(honeypot_receiver)
#
# # Emitting the signal
# honeypot.send(sender=SomeModel, instance=my_instance, request=my_request)

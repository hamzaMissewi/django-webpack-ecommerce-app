from django.shortcuts import render

from importMedia.importVideo import download_video_from_url


# Create your views here.


def home(request):
    site_name = request.global_context['site_name']
    download_video_from_url(request, "", 0, {width: 0, height: 0})
    return render(request, 'my_template.html', {'site_name': site_name})

    # products = Product.objects.all().filter(is_available=True).order_by('created_date')

    # return HttpResponse('<h2>hamza test</h2>')

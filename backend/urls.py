"""
URL configuration for greatecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls.static import static
from django.conf import settings
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from . import schema

# from userProjects.schema import schema

urlpatterns = [
                  # re_path(r'^admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
                  path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
                  # path('securelogin/', admin.site.urls),
                  path('secret/', admin.site.urls),
                  path('', views.home, name='home'),
                  path('cart/', include('carts.urls')),
                  path('accounts/', include('auth.urls')),
                  # path('store/', include('store.urls')),
                  # path('orders/', include('orders.urls')),
                  path("graphql/", GraphQLView.as_view(graphiql=True)),  # graphiql=True enables the GraphiQL interface
                  path("graphql2/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
                  path('', TemplateView.as_view(template_name='index.html')),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

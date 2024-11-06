from django.db import models


# Create your models here.

class Product(models.Model):
    # title = models.CharField(max_length=100, blank=True)
    # image = models.ImageField(max_length=256)
    # price = models.FloatField(max_length=500)
    product_name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(max_length=500, blank=True)
    price = models.IntegerField()
    stock = models.IntegerField()
    images = models.ImageField(upload_to='photos/products')

    # price = models.FloatField(min_value=0, max_value=100000)

    def __str__(self):
        return self.title


class Variation(models.Model):
    title = models.CharField(max_length=250, blank=True)

    def __str__(self):
        return self.title

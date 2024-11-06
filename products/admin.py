from django.contrib import admin

from products.models import Category, Product


# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price']


admin.site.register(Category)
admin.site.register(Product, ProductAdmin)

# localhost:8000/admin/products/product

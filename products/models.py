from django.db import models


# In Django, you can use various database management systems (DBMS) as your backend database. The Django ORM (Object-Relational Mapping) abstracts the database interactions, allowing you to interact with different databases using the same Django model classes. Below is a list of popular databases that you can use with Django, along with a brief explanation of how to configure them.

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=256)
    image = models.ImageField(max_length=256)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def __description__(self):
        return self.description

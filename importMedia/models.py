from django.db import models


# Create your models here.

class Asset(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=256)
    image = models.ImageField(max_length=256)

    def __str__(self):
        return self.title

    def __description__(self):
        return self.description


# POSTGRESQL
class MyModel(models.Model):
    dimensions = models.JSONField()
    width = models.IntegerField()
    height = models.IntegerField()


# Example usage
instance = MyModel(dimensions={'width': 100, 'height': 200})
instance.save()

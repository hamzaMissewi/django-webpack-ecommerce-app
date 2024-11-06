from rest_framework import serializers
from .models import Cart


# TODO
# class Todo(models.Model):
#     title = models.CharField(max_length=150)
#     description = models.CharField(max_length=500)
#     completed = models.BooleanField(default=False)
#
#     def __str__(self):
#         return self.title

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('cart_id', 'title', 'date_added')

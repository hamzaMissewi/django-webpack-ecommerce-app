from django.db import models

# Create your models here.

class UserProject(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField()

    def __str__(self):
        return self.title
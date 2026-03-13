from django.db import models

# Create your models here.

class Movie(models.Model):
    name = models.CharField("Name", max_length=240)
    genre = models.CharField("Genre", max_length=100)
    description = models.CharField(max_length=1000)
    duration = models.CharField("Duration", max_length=50)
    poster = models.CharField("URL", max_length=512)

    def __str__(self):
        return self.name
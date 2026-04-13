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

class Hall(models.Model):
    name = models.CharField(max_length=100)
    hall_config = models.JSONField(default=list, blank=True)
    hall_price_standard = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    hall_price_vip = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    def __str__(self):
        return self.name


class Session(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
    start_time = models.DateTimeField()

    def __str__(self):
        return self.movie

class Price(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return self.session

class Booking(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    seats = models.JSONField()
    qr_code = models.CharField(max_length=512)

    def __str__(self):
        return self.session
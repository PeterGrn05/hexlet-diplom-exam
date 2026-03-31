from django.db import models
from tomovies.models import Session

class Booking(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='bookings')
    seats = models.JSONField()
    qr_code = models.CharField(max_length=512, blank=True, null=True)
    user_email = models.EmailField()
    user_phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    is_confirmed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Booking for {self.session} - {self.user_email}"
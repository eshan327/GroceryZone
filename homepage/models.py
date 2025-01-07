from django.db import models

# Model for a Store
class Store(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    phone = models.CharField(max_length=20)
    distance = models.FloatField()
    rating = models.FloatField()

    def __str__(self):
        return self.name

# Model for a Wishlist
class Wishlist(models.Model):
    buyer = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    items = models.JSONField()
    status = models.CharField(max_length=10, choices=[
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('FULFILLED', 'Fulfilled')
    ])
    wishmaster = models.CharField(max_length=255, null=True, blank=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)

    def __str__(self):
        return f"Wishlist by {self.buyer} - {self.status}"

from django.conf import settings
from django.db import models

from products.choices import ProductChoices

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=ProductChoices.Category.choices, default=ProductChoices.Category.UNKNOWN)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    stock = models.PositiveIntegerField(default=0)
    stock_status = models.CharField(max_length=20, choices=ProductChoices.Status.choices, default=ProductChoices.Status.UNKNOWN)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_best_seller = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)
    units_sold = models.PositiveIntegerField(default=0)
    image_url = models.URLField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.name


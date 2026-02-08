from django.db import models

class ProductChoices:
    class Status(models.TextChoices):
        UNKNOWN = "unknown", "Unknown"
        OUT_OF_STOCK = "out_of_stock", "Out of Stock"
        LOW_STOCK = "low_stock", "Low Stock"
        IN_STOCK = "in_stock", "In Stock"
    
    class Category(models.TextChoices):
        UNKNOWN = "unknown", "Unknown"
        HERBAL = "herbal", "Herbal"
        KIT = "kit", "Kit"

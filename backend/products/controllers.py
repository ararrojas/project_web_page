from products.models import Product
from django.contrib.auth.models import User

def list_products() -> list[Product]:
    return Product.objects.all()
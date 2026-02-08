from django.core.management.base import BaseCommand
from products.models import Product
import pandas as pd
import requests
import numpy as np
from products.choices import ProductChoices
class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        url = "https://fakerapi.it/api/v2/products?_quantity=50"
        
        try:
            response = requests.get(url)
            data = response.json()['data']
            df_raw = pd.DataFrame(data)

            tea_types = ["Green Tea", "Red Tea", "Black Tea", "Oolong Tea", "White Tea", "Matcha"]
    
            
            products_to_create = []
            for i, row in df_raw.iterrows():
                net = round(np.random.uniform(5.0, 20.0), 2)
                tax_val = round(net * 0.10, 2) # 10% IVA
                total = net + tax_val
                sold = np.random.randint(0, 100)
                
                products_to_create.append(Product(
                    name=f"{np.random.choice(tea_types)} #{i+1}",
                    description=row['description'],
                    category=ProductChoices.Category.HERBAL,
                    net_price=net,
                    tax=tax_val,
                    price=total,
                    stock=np.random.randint(10, 200),
                    units_sold=sold,
                    is_active=True,
                    image_url=row['image']
                ))
                for product in products_to_create:
                    stock_status = ProductChoices.Status.UNKNOWN
                    if product.stock > 50:
                        stock_status = ProductChoices.Status.IN_STOCK
                    elif product.stock <= 10:
                        stock_status = ProductChoices.Status.LOW_STOCK
                    elif product.stock == 0:
                         stock_status = ProductChoices.Status.OUT_OF_STOCK
                    product.stock_status = stock_status

            Product.objects.bulk_create(products_to_create)
            self.stdout.write(self.style.SUCCESS(f'✅ {len(products_to_create)} products created successfully!'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {e}'))
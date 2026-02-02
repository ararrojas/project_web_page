from products.models import Product
from django.contrib.auth.models import User
from django.http import JsonResponse
import pandas as pd
from django.db.models import Sum

def list_products() -> list[Product]:
    return Product.objects.all()

def list_best_sellers() -> list[Product]:
    return Product.objects.filter(is_active=True, is_best_seller=True).order_by("-created_at")

def calculate_stats(request):
    queryset = Product.objects.all().values()
    df = pd.DataFrame(list(queryset))

    if df.empty:
        return JsonResponse({"error": "No data found"}, status=404)

    total_sold = int(df['units_sold'].sum())
    total_available = int(df['stock'].sum())
    total_gains = float((df['units_sold'] * df['price']).sum())
    avg_gain = round(total_gains / total_sold, 2) if total_sold > 0 else 0


    pie_data = df.groupby('is_best_seller')['stock'].sum().reset_index()
    pie_data['label'] = pie_data['is_best_seller'].map({True: 'Best Sellers', False: 'Regular'})

    top_5 = df.nlargest(5, 'units_sold')[['name', 'units_sold']].to_dict(orient='records')

    response_data = {
        "summary": {
            "total_sold": total_sold,
            "total_available": total_available,
            "total_gains": round(total_gains, 2),
            "avg_gain": avg_gain
        },
        "charts": {
            "inventory_pie": pie_data[['label', 'stock']].to_dict(orient='records'),
            "top_products": top_5
        }
    }

    return response_data
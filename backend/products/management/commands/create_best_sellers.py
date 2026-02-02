from django.core.management.base import BaseCommand
from products.models import Product
from django.db import connection

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        Product.objects.all().delete()
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='products_product';")

        names = ["EarthCycle Collection","Zero‑Waste Daily Sachets (30‑day pack)","Garden Brew Kit — Grow Plants with Used Tea","Tea Sommelier Discovery Pack"]
        descriptions = ["A curated set of 4 premium loose‑leaf teas packaged in a biodegradable tube made from agricultural waste fibers. Includes: Mountain Jasmine Green,Wildflower White, Ember Black, Mint & Meadows Herbal Infusion. Every component — label, ink, bag, tube — is compostable. Comes with a guide on turning used leaves into plant fertilizer.",
        "A month‑long supply of biodegradable pyramid sachets made from cornstarch fibers. Flavors include: Citrus Sencha, Vanilla Rooibos, Orchid Oolong. Individually wrapped in compostable paper; perfect for quick brewing with minimal footprint.",
        "A gift box that combines premium teas with a small planter and seed pack. Inside: 2 teas that work famously in compost (Earl Grey Citrus, Chamomile Bouquet), mini terracotta pot, seed mix (basil, mint, lavender). Guide: “Turn Your Tea into Soil Food”. A ritual that goes from cup → soil → new plants.",
        "A sensory journey pack curated by in‑house specialists. Includes: 6 teas with tasting cards, brewing temperature guide, aroma wheel, composting & sustainability booklet. Focus on education + sustainability, turning tea lovers into conscious connoisseurs."]
        prices = [29.99, 15, 25, 49.99]
        stocks = [5000, 10000, 1000, 5000]
        units_sold = [1000, 2000, 500, 1000]
        is_active = [True, True, True, True]
        is_best_seller = [True, True, True, True]

        created = 0

        for i in range(4):
            products = Product.objects.create(
                name=names[i],
                description=descriptions[i],
                price=prices[i],
                stock=stocks[i],
                units_sold=units_sold[i],
                is_active=True,
                is_best_seller=True,
            )
            created += 1
        self.stdout.write(self.style.SUCCESS(f"Created {created} best seller products."))



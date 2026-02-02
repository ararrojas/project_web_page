from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from products.models import Product
from products.serializers import ProductSerializer
from products.controllers import list_products, list_best_sellers, calculate_stats

from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.views import APIView

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            products = list_products()
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        data = ProductSerializer(products, many=True).data
        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["get"], url_path="best_sellers")
    def best_sellers(self, request):
        try:
            products = list_best_sellers()
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        data = ProductSerializer(products, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="stats")
    def stats(self, request):
        try:
            stats = calculate_stats(request)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(stats, status=status.HTTP_200_OK)
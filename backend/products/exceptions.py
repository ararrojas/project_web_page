class ProductException(Exception):
    def __init__(self, message: str):
        self.message = message

class ProductNotFound(ProductException):
    def __init__(self, product_id: int):
        self.message = f"Product with id {product_id} not found"
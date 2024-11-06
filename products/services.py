# myapp/services.py
from .models import Product


class ProductService:
    @staticmethod
    def create_product(name, price):
        product = Product(name=name, price=price)
        product.save()
        return product

    @staticmethod
    def get_product_by_name(name):
        try:
            product = Product.objects.get(name=name)
            return product
        except Product.DoesNotExist:
            # logger.info('cannot find product with name')
            return None

    @staticmethod
    def get_all_products():
        return Product.objects.all()

    @staticmethod
    def get_product_by_id(product_id):
        try:
            return Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return None

    @staticmethod
    def update_product(product_id, name=None, price=None):
        product = ProductService.get_product_by_id(product_id)
        if product:
            if name:
                product.name = name
            if price is not None:
                product.price = price
            product.save()
            return product
        return None

    @staticmethod
    def delete_product(product_id):
        product = ProductService.get_product_by_id(product_id)
        if product:
            product.delete()
            return True
        return False

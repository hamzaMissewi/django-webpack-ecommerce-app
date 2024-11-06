import graphene
from graphene_django.types import DjangoObjectType
from store.models import Product


class ProductType(DjangoObjectType):
    class Meta:
        model = Product


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProductType)

    def resolve_all_products(self, info, **kwargs):
        return Product.objects.all()


# class Mutation(graphene.ObjectType):
schema = graphene.Schema(query=Query)

# {
#     allProjects
# {
#     title
# author
# }
# }

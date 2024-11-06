from graphene import *
# from graphene_django.types import DjangoObjectType
from store.models import Product


# import requests
# import json


class ProductType(DjangoObjectType):
    class Meta:
        model = Product


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProductType)

    def resolve_all_products(self, info, **kwargs):
        return Product.objects.all()


# class Mutation(graphene.ObjectType):
schema = graphene.Schema(query=Query)

# url = 'https://fakeurl.com/graphql/'
# query = """{ resources { edges { node { id uri creatorPerson { firstName lastName } } } } }"""
# r = requests.post(url, json={'query': query})
# print(r.text)

# url = 'https://mygraphqlserver.com/graphql/'
# query = """{ resources { edges { node { id creatorPerson { firstName } } } } }"""
# r = requests.post(url, json={'query': query})
# json_data = json.loads(r.text)
# resources_dict = json_data['data']['resources']['edges']
# resources_output = pd.DataFrame(resources_dict)
# print(resources_output)

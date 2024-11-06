import graphene
from graphene_django.types import DjangoObjectType
from .models import UserProject


class ProjectType(DjangoObjectType):
    class Meta:
        model = UserProject


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info, **kwargs):
        return UserProject.objects.all()


# class Mutation(graphene.ObjectType):
schema = graphene.Schema(query=Query)

# {
#     allProjects
# {
#     title
# author
# }
# }

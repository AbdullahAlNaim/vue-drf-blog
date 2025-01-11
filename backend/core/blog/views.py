from rest_framework import viewsets, mixins, permissions
from .models import Blog
from .permissions import IsOwnerReadOnly
from django.contrib.auth.models import User
from .serializers import BlogSerializer, UserSerializer
from django.http import HttpResponse
from rest_framework.views import APIView

# Create your views here.
class CsrfTokenView(viewsets.ViewSet):
    def list(self, request):
        csrf_token = request.META.get('HTTP_X_CSRFTOKEN')
        return Response({'csrf_token': csrf_token})
        

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_class = [permissions.IsAuthenticatedOrReadOnly,
    IsOwnerReadOnly]

    def get_query(self):
        query_set  = super().get_query()

        user = self.request.user
        if user.is_authenticated:
            query_set = query_set.filter(author=user)

        return query_set

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_class = [permissions.AllowAny,]

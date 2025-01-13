from rest_framework import viewsets, mixins, permissions
from .models import Blog
from .permissions import IsOwnerReadOnly
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .serializers import BlogSerializer, UserSerializer
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import get_token
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework import status
# from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken

class LoginAPIView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this endpoint

    def post(self, request, *args, **kwargs):
        # Extract username and password from the request data
        username = request.data.get("username")
        password = request.data.get("password")

        # Validate the input
        if not username or not password:
            return Response(
                {"error": "Both username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Log in the user
            return Response(
                {"message": "Login successful"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

# class CustomLoginView(APIView):
#     def post(self, request):
#         # Extract user credentials from the request
#         username = request.data.get('username')
#         password = request.data.get('password')

#         # Authenticate the user
#         user = authenticate(username=username, password=password)
        
#         if user is not None:
#             # Create JWT token
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# @api_view(['GET'])
# def get_csrf_token(request):
#     csrf_token = get_token(request)
#     print(csrf_token)
#     return Response({'csrf_token': csrf_token})


class GetCSRFTokenView(APIView):
    permission_classes = [AllowAny]  # Allow any client to access this endpoint

    def get(self, request, *args, **kwargs):
        # Generate CSRF token
        csrf_token = get_token(request)
        # Return the token as a JSON response
        return Response({'csrf_token': csrf_token})


# class CsrfTokenView(viewsets.ViewSet):
#     def list(self, request):
#         csrf_token = request.META.get('HTTP_X_CSRFTOKEN')
#         return Response({'csrf_token': csrf_token})


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

        user = serializer.instance
        if not Token.objects.filter(user=user).exists():
            Token.objects.create(user=user)


class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_class = [permissions.AllowAny,]

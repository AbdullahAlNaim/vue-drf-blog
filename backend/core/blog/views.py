from rest_framework import viewsets, mixins, permissions
from .models import Blog
from .permissions import IsOwnerReadOnly
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import get_token
from django.http import HttpResponse, JsonResponse
from .serializers import BlogSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


class LoginAPIView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this endpoint

    def post(self, request, *args, **kwargs):
        # Extract username and password from the request data
        # username = request.data.get("username")
        # password = request.data.get("password")
        user = authenticate(request, username=request.data['username'], password=request.data['password'])

        if user:
            token, created = Token.objects.get_or_create(user=user)
            print(token)

            response = JsonResponse({
                'token': str(token.key)
            })

            return response
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
        # if user:
        #     refresh = RefreshToken.for_user(user)

        #     response = JsonResponse({
        #         "message": "Login successful",
        #         "token": str(refresh.access_token)
        #     })
        #     response.set_cookie(
        #         'access_token',
        #         refresh.access_token,
        #         httponly=True,
        #         secure=True,
        #         samesite='None',
        #         max_age=3600
        #     )
        #     print(refresh.access_token)
        #     return response
        # else:
        #     return Response({"error", "Invalid credentials"}, status=401)

        # Validate the input
        # if not username or not password:
        #     return Response(
        #         {"error": "Both username and password are required."},
        #         status=status.HTTP_400_BAD_REQUEST,
        #     )

        # # Authenticate the user
        # user = authenticate(request, username=username, password=password)
        # if user is not None:
        #     login(request, user)  # Log in the user
        #     token, created = Token.objects.get_or_create(user=user)
            
        #     return Response(
        #         {
        #             "message": "Login successful",
        #             "token": token.key
        #         },
        #         status=status.HTTP_200_OK,
        #     )
        # else:
        #     return Response(
        #         {"error": "Invalid username or password."},
        #         status=status.HTTP_401_UNAUTHORIZED,
        #     )

        def perform_create(self, serializer):
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            print(token)
            self.token = token


class LogoutAPIView(APIView):
    def post(self, request, *args,**kwargs):
        try:
            logout(request)
            print('server logged out successfully')
        except:
            print('something went wrong')
        return Response(
            {"message": "Logout successful"},
            status=status.HTTP_200_OK
        )


class GetCSRFTokenView(APIView):
    permission_classes = [AllowAny]  # Allow any client to access this endpoint

    def get(self, request, *args, **kwargs):
        # Generate CSRF token
        csrf_token = get_token(request)
        # Return the token as a JSON response
        return Response({'csrf_token': csrf_token})


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        query_set  = super().get_queryset()

        user = self.request.user
        if user.is_authenticated:
            return super().get_queryset().filter(author=user)

        return super().get_queryset().none()


    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

        user = serializer.instance.author
        if not Token.objects.filter(user=user).exists():
            Token.objects.create(user=user)
            


class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny,]
    

    def perform_create(self, serializer):
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        print(token)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=request.data['username'])
        token = Token.objects.get(user=user)
        response.data['token'] = token.key
        print(token)
        return response

from django.urls import path, include
from blog import views
from rest_framework.routers import DefaultRouter
from .views import GetCSRFTokenView, LoginAPIView, LogoutAPIView


router = DefaultRouter()
router.register('blog', views.BlogViewSet, basename='blog')
router.register('user', views.UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    # path('get_csrf_token/', views.get_csrf_token),
    path('csrf-token/', GetCSRFTokenView.as_view(), name='csrf-token'),
    path('api/login/', LoginAPIView.as_view(), name='api-login'),
    path('api/logout/', LogoutAPIView.as_view(), name='logout'),
]
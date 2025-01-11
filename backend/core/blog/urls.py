from django.urls import path, include
from blog import views
from rest_framework.routers import DefaultRouter
from .views import CsrfTokenView

router = DefaultRouter()
router.register('blog', views.BlogViewSet, basename='blog')
router.register('user', views.UserViewSet, basename='user')
router.register(r'csrf-token', CsrfTokenView, basename='csrf-token') 

urlpatterns = [
    path('', include(router.urls)),
]
from django.urls import path, include
from blog import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('blog', views.BlogViewSet, basename='blog')
router.register('user', views.UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls))
]
from rest_framework import serializers
from blog.models import Blog
from django.contrib.auth.models import User

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'body', 'created_at']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(password)
        user.save()
        return user
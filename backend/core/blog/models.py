from django.db import models

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey('auth.User', related_name='blog', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_at']

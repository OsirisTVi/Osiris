from django.contrib.auth.models import AbstractUser
from django.db import models


class UserProfile (models.Model):

    username = models.CharField(max_length=30,unique=True,null=True)
    avatar = models.ImageField(blank=True,null=True)
    name = models.CharField(max_length=40,blank=True,null=True)
    family = models.CharField(max_length=40,blank=True,null=True)
    bio = models.TextField(blank=True,null=True)
    age = models.IntegerField(blank=True,null=True)
    date_birthday = models.DateTimeField(blank=True,null=True)

    def __str__(self) -> str:
        return f'{self.username}'



class User(AbstractUser):
    
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    refresh_token = models.CharField(default=None,max_length=300,null=True,blank=True)
    username = models.CharField(max_length=30,unique=True)
    user_profile = models.OneToOneField(UserProfile, related_name='user', on_delete=models.CASCADE, null=True)


    class Meta:
        ordering = ["-date_joined"]



    def __str__(self) -> str:
        return f'{self.email}'
    





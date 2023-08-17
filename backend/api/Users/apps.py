from django.apps import AppConfig
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model








class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.Users'


    def ready(self):
        User = get_user_model()
        from . import signals
        post_save.connect(signals.create_user_profile, sender=User) 

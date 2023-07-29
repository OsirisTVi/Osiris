from rest_framework import serializers
from .validators import RegisterValidator
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User







class RegistrationSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    repeat_password = serializers.CharField(write_only=True)
    access_token = serializers.CharField(read_only=True)
    refresh_token = serializers.CharField(read_only=True)





    def validate(self, attrs):
        
        validator = RegisterValidator(attrs)
        validator.run_validate()

        if validator.is_validate:
            return attrs
        
        
        raise ValidationError(validator._errors)
        
    


    def create(self, validated_data):
        
        username = validated_data.get('username')
        password = validated_data.get('password')

        user = User.objects.create(username=username)
        user.set_password(password)

        user.save()
        


        return user
    



    
    
    
from rest_framework import serializers
from .validators import RegisterValidator
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from .services.authService import RegisterService
from .models import UserProfile


User = get_user_model()







class RegistrationSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    repeat_password = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=True)
    access_token = serializers.CharField(read_only=True)
    refresh_token = serializers.CharField(write_only=True,required=False)





    def validate(self, attrs):
        
        validator = RegisterValidator(attrs)
        validator.run_validate()

        if validator.is_validate:
            return attrs
        
        
        raise ValidationError(validator._errors)
        
    


    def create(self, validated_data):


       user_init = RegisterService(validated_data)
       return user_init.register()
        
    




class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = '__all__'



    def update(self, instance, validated_data):


        instance.age = validated_data.get('age', instance.age)


        instance.save()
        return instance



    



    
    
    
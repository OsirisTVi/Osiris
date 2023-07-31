from rest_framework import serializers
from .models import (AllCountry,
                     AllGenres,
                     Film)




class ErrorSerializer(serializers.Serializer):
    detail = serializers.CharField()





class FilmSerializer(serializers.ModelSerializer):

    class Meta:

        model = Film
        fields = '__all__'






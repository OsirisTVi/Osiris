from django.shortcuts import render
from rest_framework.views import APIView
from .models import (Film,)
from .serializers import (FilmSerializer,ErrorSerializer)
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions





class FilmsRetrieveApiView(APIView):
    
    def get(self,request):
            
        
       try:
            
          refresh_token = request.COOKIES.get('refreshToken')


          films = Film.objects.all()
          filmSerializer = FilmSerializer(films,many=True)

          return Response(filmSerializer.data)
            
            

          
       except Film.DoesNotExist:
            return Response('Film not found', status=status.HTTP_404_NOT_FOUND)



        
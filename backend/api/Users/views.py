from django.shortcuts import render
from .serializers import RegistrationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from  .tokensUtils import AllTokensUtils
from rest_framework_simplejwt.tokens import RefreshToken





class RegistrationApiView(APIView):

    def post(self, request):


        serializer = RegistrationSerializer(data=request.data)


        try:

            if serializer.is_valid(raise_exception=True):


                user = serializer.save()
                responseData = AllTokensUtils.accessRefreshForUser(user=user,data=serializer.data)

                return Response(responseData)



        except ValidationError :
            print(serializer._errors)
            return Response(serializer._errors,status=status.HTTP_400_BAD_REQUEST)





class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer






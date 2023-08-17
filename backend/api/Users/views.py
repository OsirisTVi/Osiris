from django.shortcuts import render
from .serializers import RegistrationSerializer,UserProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from  .tokensUtils import AllTokensUtils
from .services.authService import RegisterService
import base64
from django.contrib.auth import get_user_model


User = get_user_model()





class RegistrationApiView(APIView):

    def post(self, request):



        serializer = RegistrationSerializer(data=request.data)


        try:

            if serializer.is_valid(raise_exception=True):

                user = serializer.save()
                responseData = AllTokensUtils.accessRefreshForUser(user=user,data=serializer.data)

                print(responseData['refreshToken'])

                
                response = Response(responseData['data'])
                response.set_cookie('refreshToken', responseData['refreshToken'], httponly=True, max_age=2592000)

                return response

        except ValidationError :
            print(serializer._errors)
            return Response({'errors': serializer._errors},status=status.HTTP_400_BAD_REQUEST)











class LogoutView(APIView):


    def get(self,request):
         
         token = request.cookies
         print(token)


         return Response(token)




class UserProfileView(APIView):

    def get(self, request):
        user = request.user

        if user.is_authenticated:

            user_instance = user  


            userProfileData = {
                'id': user_instance.id,
                'username': user_instance.username,
                'email': user_instance.email,
                'age' : user_instance.user_profile.age,
                'photo': self.get_avatar_base64(user_instance.user_profile.avatar)
            }

            

            return Response(userProfileData)
        else:
            return Response({'error': 'User not authenticated'}, status=401)


    def get_avatar_base64(self, avatar):
        if avatar:
            with avatar.open('rb') as f:
                return base64.b64encode(f.read()).decode('utf-8')
        return None
    


    
    def patch(self,request):

        data = request.data

        access_token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

        decoded_access_token = AllTokensUtils.decodeAccessToken(access_token=access_token)

        
        user = User.objects.get(email=decoded_access_token['email'])


        user_profile = user.user_profile




        try :
            serializer = UserProfileSerializer(data=data,instance=user_profile,partial=True)

            if serializer.is_valid(raise_exception=True):

                serializer.save()

                return Response(serializer.data)
            
            
        except User.DoesNotExist:
            return Response('User not found', status=status.HTTP_404_NOT_FOUND)
        

        except Exception as e:
            print(e)
            return Response('error bad request')












class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    '''
    Кастомный класс чтобы кинуть в токен некоторый боди дату
    '''

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        # ...

        return token
    
    
    

class MyTokenObtainPairView(TokenObtainPairView):
    '''После регистрации устанавливаем куки и посылаем в респонс accest token для localstorage'''


    serializer_class = MyTokenObtainPairSerializer
    username_field = 'email' 



    def post(self, request, *args, **kwargs):
        print(request.data)
        response = super().post(request, *args, **kwargs)


        if response.status_code == 200:
            refresh_token = response.data['refresh']
            response.set_cookie('refreshToken',
                                 refresh_token, 
                                 httponly=True, 
                                 max_age=2592000)

        return response







class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refreshToken')

        if not refresh_token:
            return Response({'detail': 'Refresh token not found in cookies.'}, status=status.HTTP_400_BAD_REQUEST)
        
        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)

        return response
        

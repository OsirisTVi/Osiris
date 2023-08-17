from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from config import settings



class AllTokensUtils:


    @staticmethod
    def accessRefreshForUser(user,data):

        refresh = CustomRefreshTokenForUser.for_user(user)
        user.refresh_token = str(refresh)
        user.save()

        data['access_token'] = str(refresh.access_token)
            

        return {'data':data,
                'refreshToken' : str(refresh) }
    

    @staticmethod
    def decodeAccessToken(access_token):

        decoded_access_token = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])

        return decoded_access_token

    









class CustomRefreshTokenForUser(RefreshToken):

    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)

        token['email'] = user.email

        return token
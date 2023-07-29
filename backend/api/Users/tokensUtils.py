from rest_framework_simplejwt.tokens import RefreshToken



class AllTokensUtils:


    @staticmethod
    def accessRefreshForUser(user,data):

        refresh = CustomRefreshTokenForUser.for_user(user)

        data['access_token'] = str(refresh.access_token)
        data['refresh_token'] = str(refresh)

        return data









class CustomRefreshTokenForUser(RefreshToken):

    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)

        token['username'] = user.username

        return token
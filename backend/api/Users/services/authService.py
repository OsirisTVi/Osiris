from api.Users.tokensUtils import AllTokensUtils
from django.contrib.auth import get_user_model

User = get_user_model()


class AuthService:
        

    def __init__(self,validated_data=None):
          
          self.validated_data=validated_data





class RegisterService(AuthService):
        
    def __init__(self,validated_data=None):
            super().__init__(validated_data=validated_data)


    
    def register(self):
        email = self.validated_data.get('email')
        password = self.validated_data.get('password')
        username = self.validated_data.get('username')

        print(username)


        user = User.objects.create(email=email,username=username)
        user.set_password(password)
        user.save()

        return user





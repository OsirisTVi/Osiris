from django.contrib.auth import get_user_model
import re


User = get_user_model()



class BaseValidator:

    def __init__(self,data):
        
        self.data = data
        self._errors = {}
        self.is_validate = True

    
    def is_valid(self):
        if self._errors:
            self.is_validate= False

    


class RegisterValidator(BaseValidator):


    def __init__(self,data):
        super().__init__(data)




    def validate_password(self):
        self._errors['password'] = []

        password = self.data.get("password")
        repeat_password = self.data.get("repeat_password")

        if password != repeat_password : 
            self._errors['password'].append('password do not match')

        if not self._errors['password']:
            del self._errors['password']


    def validate_email(self):
        self._errors['email'] = []

        email = self.data.get("email")
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


        if not re.match(email_pattern, email):
            self._errors['email'].append('Invalid email format')

        if  User.objects.filter(email=email).exists():
            self._errors['email'].append('Пользователь с такой почтой уже сущесвует')


        if not self._errors['email']:
            del self._errors['email']


    def validate_username(self):
        self._errors['username'] = []

        username = self.data.get("username")



        if  User.objects.filter(username=username).exists():
            self._errors['username'].append('Это имя уже занято')

        if len(username) < 5 or len(username) > 30:
            self._errors['username'].append('Длина имени должно быть в диапазоне 5-30 символов : a-Z/0-9')


        
    
        if not self._errors['username']:
            del self._errors['username']




    def run_validate(self):

        self.validate_password()
        self.validate_email()
        self.validate_username()



        return self.is_valid()
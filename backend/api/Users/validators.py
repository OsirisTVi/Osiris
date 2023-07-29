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


    def validate_login(self):
        self._errors['username'] = []

        username = self.data.get("username")

        if  len(username) < 6:
            self._errors['username'].append('username must be at least 6 character (a-Z,0-9)')

        if not self._errors['username']:
            del self._errors['username']




    def run_validate(self):

        self.validate_password()
        self.validate_login()


        return self.is_valid()
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, password = None):
        if not email:
            raise ValueError('Users must have an email address!')
        
        if not username:
            raise ValueError('Users must have an username!')
        
        if not first_name:
            raise ValueError('Users must have a First Name!')
        
        if not last_name:
            raise ValueError('Users must have a Last Name!')

        
        user = self.model(
            username = username,
            email = self.normalize_email(email),
            first_name = first_name, 
            last_name = last_name
        )

        user.set_password(password)

        user.save()
        return user

    
    def create_superuser(self, username, email, first_name, last_name, password = None):
        user = self.create_user(
            username,
            email,
            first_name,
            last_name,
            password = password
        )

        user.is_admin = True 
        
        user.save()
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length = 255, unique = True)
    email = models.EmailField(max_length = 255, unique = True)
    first_name = models.CharField(max_length = 255, blank = False, null = False)
    last_name = models.CharField(max_length = 255, blank = False, null = False)
    
    


    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)
    is_admin = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']


    def get_full_name(self):
        return str(self.first_name + self.last_name)

    
   

    def __str__(self):
        return str(self.username)
    
    
    def has_perm(self, perm, obj = None):
        return True 
    

    def has_module_perms(self, app_label):
        return True
    

    @property
    def is_staff(self):
        return self.is_admin




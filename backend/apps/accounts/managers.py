from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Endereço de email não pode estar vazio")
                
        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def update_user(self, user, **extra_fields):
        password = extra_fields.pop("password", None)

        for field, value in extra_fields.items():
            setattr(user, field, value)

        if password:
            user.set_password(password)
        
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields["role"] = "admin"

        return self.create_user(email, password, **extra_fields)



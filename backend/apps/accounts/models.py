from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager, 
    PermissionsMixin, 
)
from apps.core.models import BaseModel

class IDENTITYSOURCE(models.TextChoices):
    ERP = "ERP", "ERP"
    LOCAL = "LOCAL", "Local"

class UserManager(BaseUserManager):

    def create_user(self, external_id, identity_source, password=None, **extra_fields):

        if not external_id:
            raise ValueError("El usuario es obligatorio")
        
        if not identity_source:
            raise ValueError("El tipo de dominio es obligatorio")
        
        if identity_source not in IDENTITYSOURCE.values:
            raise ValueError("La fuente de identidad no es válida")
        
        external_id = self.model.normalize_username(
            external_id
        )

        user = self.model(
            external_id=external_id,
            identity_source=identity_source,
            **extra_fields
        )

        if identity_source == IDENTITYSOURCE.ERP:
            user.set_unusable_password()
        else:
            if not password:
                raise ValueError("La contraseña es obligatoria para usuarios LOCAL")

            user.set_password(password)

        user.save(using=self._db)

        return user

    def create_superuser(self, external_id, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("identity_source", IDENTITYSOURCE.LOCAL)

        if extra_fields["is_staff"] is not True:
            raise ValueError("El superusuario debe tener is_staff=True")

        if extra_fields["is_superuser"] is not True:
            raise ValueError("El superusuario debe tener is_superuser=True")

        return self.create_user(
            external_id=external_id,
            password=password,
            **extra_fields
        )
    

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    external_id = models.CharField('Usuario', max_length=30, unique=True)
    is_staff = models.BooleanField('Es personal administrativo', default=False)
    full_name = models.CharField(
        'Nombre completo', max_length=200, null=True, blank=True
    )
    
    identity_source = models.CharField('Fuente de identidad', max_length=10, choices=IDENTITYSOURCE)
    email = models.EmailField('Correo electrónico', max_length=200, null=True, blank=True)
    
    USERNAME_FIELD = "external_id"
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    def __str__(self):
        return f"{self.external_id} - {self.full_name}"
        
    class Meta:
        db_table = "user"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
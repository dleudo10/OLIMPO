from django.db import models
from apps.core.models import BaseModel

class Application(BaseModel):
    """
    Cada sistema/app que delega su login en este SSO.
    'client_id' corresponde a la Application de django-oauth-toolkit
    (oauth2_provider.Application) registrada para ese aplicativo.
    """
    code = models.SlugField('Codigo', max_length=50, unique=True)
    name = models.CharField('Nombre', max_length=150)
    description = models.TextField('Descripción', blank=True)
    url_base = models.URLField('URL', help_text="URL a la que se redirige tras el login")
    icon = models.CharField('Icono',
        max_length=50, help_text="Nombre de ícono opcional para el dashboard"
    )
     
    class Meta:
        db_table = "applications"
        verbose_name = "Aplicativo"
        verbose_name_plural = "Aplicativos"

    def __str__(self):
        return self.name
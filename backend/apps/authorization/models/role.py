from django.db import models
from apps.applications.models import Application
from .permissions import Permission
from apps.core.models import BaseModel
from django.core.exceptions import ValidationError

class Role(BaseModel):
    """Rol dentro de un aplicativo específico (p. ej. 'Administrador', 'Consulta')."""
    
    application = models.ForeignKey(Application, on_delete=models.PROTECT, related_name="roles")
    code = models.SlugField(max_length=50)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    permissions = models.ManyToManyField(Permission, related_name="roles", blank=True)
    
                        
    class Meta:
        db_table = "role"
        verbose_name = "Rol"
        verbose_name_plural = "Roles"
        ordering = ["application", "name"]
        constraints = [
            models.UniqueConstraint(
                fields=["application", "code"],
                name="role_unique_application_code",
            ),
        ]

    def __str__(self):
        return f"{self.code} - {self.name}"
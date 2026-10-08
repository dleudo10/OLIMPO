from django.db import models
from django.conf import settings
from .application import Application
from apps.authorization.models import Role
from apps.core.models import BaseModel

class AccessApplications(BaseModel):
    """
    Tabla puente: qué usuario tiene acceso a qué aplicativo y con qué rol.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="accesos"
    )
    application = models.ForeignKey(
        Application, on_delete=models.PROTECT, related_name="accesos"
    ) 
    role = models.ForeignKey(Role, on_delete=models.PROTECT, related_name="accesos")
    
    class Meta:
        db_table = "access_applications"
        verbose_name = "Acceso usuario-aplicativo"
        verbose_name_plural = "Accesos usuario-aplicativo"
        constraints = [
            models.UniqueConstraint(
                fields=["user", "application"],
                name="unique_user_application",
            ),
        ]
        indexes = [
            models.Index(fields=["user", "application"]),
        ]

    def __str__(self):
        return f"{self.user} -> {self.application.code} ({self.role.code})"
    
    def clean(self):
        from django.core.exceptions import ValidationError

        if (
            self.role_id
            and self.application_id
            and self.role.application_id != self.application_id
        ):
            raise ValidationError(
                "El rol seleccionado no pertenece a este aplicativo."
            )
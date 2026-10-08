from django.db import models
from apps.applications.models import Application

class Permission(models.Model):
    application = models.ForeignKey(Application, on_delete=models.PROTECT, related_name="permissions")
    code = models.CharField('codigo', max_length=100)
    name = models.CharField('descripción', max_length=100)

    def __str__(self):
        return f"{self.code} - {self.name}"
    
    class Meta:
        db_table = "permissions"
        verbose_name = "Permiso"
        verbose_name_plural = "Permisos"
        constraints = [
            models.UniqueConstraint(
                fields=["application", "code"],
                name="per_unique_application_code",
            ),
        ]
from django.db import models
from django.contrib.auth import get_user_model
from apps.applications.models import Application

User = get_user_model()

class EventType(models.TextChoices):
    LOGIN_SUCCESS = "LOGIN_SUCCESS", "Inicio de sesión exitoso"
    LOGIN_FAILED = "LOGIN_FAILED", "Inicio de sesión fallido"
    
    LOGOUT = "LOGOUT", "Cierre de sesión"
    
    ACCESS_DENIED = "ACCESS_DENIED", "Acceso denegado"
    ACCESS_GRANTED = "ACCESS_GRANTED", "Acceso concedido"
    
    USER_CREATED = "USER_CREATED", "Usuario creado"
    USER_UPDATED = "USER_UPDATED", "Usuario actualizado"
    USER_ACTIVATED = "USER_ACTIVATED", "Usuario activado"
    USER_DEACTIVATED = "USER_DEACTIVATED", "Usuario desactivado"
    
    TOKEN_ISSUED = "TOKEN_ISSUED", "Token emitido"
    TOKEN_REVOKED = "TOKEN_REVOKED", "Token revocado"
    
    AUTHORIZATION_DENIED = "AUTHORIZATION_DENIED", "Autorización denegada"
    
    ROLE_ASSIGNED = "ROLE_ASSIGNED", "Rol asignado"
    ROLE_REMOVED = "ROLE_REMOVED", "Rol retirado"

class AuditEvent(models.Model):
    application = models.ForeignKey(Application, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    event_type = models.CharField(max_length=255, choices=EventType.choices)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=1000)
    success = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(null=True, blank=True)

    class Meta:
        verbose_name = "Evento de auditoría"
        verbose_name_plural = "Eventos de auditoría"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['application', 'created_at']),
            models.Index(fields=['event_type', 'created_at']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"{self.created_at} - {self.user} - {self.event_type}"
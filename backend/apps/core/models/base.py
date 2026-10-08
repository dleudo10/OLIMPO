from django.conf import settings
from django.db import models
from simple_history.models import HistoricalRecords

class BaseModel(models.Model):
    is_active = models.BooleanField(
        "estado",
        default=True,
        db_index=True
    )

    created_at = models.DateTimeField(
        "fecha de creación",
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        "fecha de actualización",
        auto_now=True
    )
    
    history = HistoricalRecords(inherit=True)
    
    class Meta:
        abstract = True
        indexes = [
            models.Index(fields=["is_active"]),
            models.Index(fields=["created_at"]),
            models.Index(fields=["updated_at"]),
        ]
        ordering = ["created_at"]
        

    
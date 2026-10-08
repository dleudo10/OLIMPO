from django.db import models
from apps.core.models import BaseModel
from .application import Application

class OIDCClient(BaseModel):
    application = models.ForeignKey(Application, on_delete=models.PROTECT, related_name="oidc_clients")
    oauth_client = models.OneToOneField("oauth2_provider.Application", on_delete=models.PROTECT) 
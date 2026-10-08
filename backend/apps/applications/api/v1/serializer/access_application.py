from rest_framework import serializers
from ....models import AccessApplications
from .portal_application import PortalApplicationSerializer
from apps.authorization.api.v1.serializer import PortalRoleSerializer

class AccessApplicationSerializer(serializers.ModelSerializer):
    application = PortalApplicationSerializer(read_only=True)
    role = PortalRoleSerializer(read_only=True)

    class Meta:
        model = AccessApplications
        fields = (
            "id",
            "application",
            "role",
        )
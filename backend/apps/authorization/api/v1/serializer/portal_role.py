from rest_framework import serializers
from ....models import Role

class PortalRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ("code", "name",)
from rest_framework import serializers
from ....models import Application

class PortalApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = (
            "name",
            "description",
            "url_base",
            "icon",
        )
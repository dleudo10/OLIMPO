from rest_framework import serializers
from ....models import Application

class PortalApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = (
            "id",
            "name",
            "category",
            "description",
            "url_base",
            "icon",
            "status"
        )
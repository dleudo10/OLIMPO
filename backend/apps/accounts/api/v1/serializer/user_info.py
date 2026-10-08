from rest_framework import serializers
from ....models import User

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "external_id",
            "full_name",
            "email",
            "identity_source",
        ]
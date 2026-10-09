from django.contrib import admin
from ..models import OIDCClient



@admin.register(OIDCClient)
class OIDCClientAdmin(admin.ModelAdmin):
    list_display = ("application", "oauth_client")
    search_fields = ("application",)
    
    # MYcaeBxkIy76wqwDpCojBl842qj17IooMr05BVyk
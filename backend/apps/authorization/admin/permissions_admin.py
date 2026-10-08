from django.contrib import admin
from ..models import Permission

@admin.register(Permission)
class PermissionsAdmin(admin.ModelAdmin):
    list_display = ("application", "code", "name")
    search_fields = ("application", "code", "name")
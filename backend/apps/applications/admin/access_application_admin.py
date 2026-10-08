from django.contrib import admin
from ..models import AccessApplications

@admin.register(AccessApplications)
class AccessApplicationAdmin(admin.ModelAdmin):
    list_display = ("user", "application", "role", "is_active", "created_at")
    list_filter = ("application", "role", "is_active")
    search_fields = ("user__external_id", "user__fullname")
    autocomplete_fields = ("user",)
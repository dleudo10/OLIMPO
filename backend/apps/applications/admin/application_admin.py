from django.contrib import admin
from ..models import Application
from apps.authorization.admin import RoleInline

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("code", "name", "description", "url_base", "is_active")
    search_fields = ("code", "name")
    list_filter = ("is_active", "created_at")
    inlines = [RoleInline]
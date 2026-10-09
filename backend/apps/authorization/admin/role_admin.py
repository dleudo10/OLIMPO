from django.contrib import admin
from ..models import Role

class RoleInline(admin.TabularInline):
    model = Role
    extra = 1

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("application", "code", "name", "description")
    search_fields = ("application", "permissions")
    
    # MYcaeBxkIy76wqwDpCojBl842qj17IooMr05BVyk
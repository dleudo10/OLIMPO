from django.contrib import admin
from .models import Role

class RoleInline(admin.TabularInline):
    model = Role
    extra = 0

from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .api.v1.forms import UserCreateForm, UserChangeForm
from .models import IDENTITYSOURCE

User = get_user_model()

class UserInline(admin.TabularInline):
    model = User
    extra = 1
    
@admin.register(User) 
class UserAdmin(BaseUserAdmin):
    list_display = ("external_id", "full_name", "identity_source", "is_staff", "is_superuser", "is_active",)
    list_filter = ("is_staff", "is_superuser", "is_active", "identity_source",)
    search_fields = ("external_id", "full_name",)
    ordering = ("external_id",)
    fieldsets = (
        (None, {
            "fields": ("external_id", "full_name", "identity_source",),
        },),
        ("Permisos", {
            "fields": ("is_active", "is_staff", "is_superuser",),
        },),
        ("Contraseña", {
            "fields": ("password1", "password2",),
        })
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "external_id",
                "full_name",
                "identity_source",
                "password1",
                "password2",
                "is_active",
                "is_staff",
                "is_superuser",
            ),
        },),
    )
    
    add_form = UserCreateForm
    form = UserChangeForm
    
    def has_change_permission(self, request, obj=None):
        if obj is not None and obj.identity_source != IDENTITYSOURCE.LOCAL:
            return False

        return super().has_change_permission(request, obj)
            
        

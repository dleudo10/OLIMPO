from django import forms
from django.contrib.auth import get_user_model
from django.db import connections

from ....models import IDENTITYSOURCE

User = get_user_model()

class UserCreateForm(forms.ModelForm):
    password1 = forms.CharField(label="Contraseña", widget=forms.PasswordInput, required=False,)
    password2 = forms.CharField(label="Confirmar contraseña", widget=forms.PasswordInput, required=False,)
    
    class Meta:
        model = User
        fields = (
            "external_id",
            "full_name",
            "identity_source",
            "is_active",
            "is_staff",
            "is_superuser",
        )
        
    def clean(self):
        cleaned_data = super().clean()

        identity_source = cleaned_data.get("identity_source")
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")
        external_id = cleaned_data.get("external_id")

        if identity_source == IDENTITYSOURCE.LOCAL:
            if not password1:
                self.add_error("password1", "La contraseña es obligatoria para usuarios LOCAL.",)

            if password1 and password1 != password2:
                self.add_error("password2", "Las contraseñas no coinciden.",)
                
        elif identity_source == IDENTITYSOURCE.ERP:
            if external_id:
                with connections["clinica"].cursor() as cursor: 
                
                    cursor.execute("""
                        SELECT
                            RTRIM(dbo.desencriptar(AUsrDsc))
                        FROM ADMUSR
                        WHERE AUSREST = 'S' AND dbo.desencriptar(AUsrId) = %s
                    """, [external_id])
                
                    row = cursor.fetchone()
                                
                if not row:
                    self.add_error("external_id", "No se encuentra el usuario dentro del HIS.") 
                else:
                    cleaned_data["full_name"] = row
        else :
            self.add_error("domain", "Dominio invalido.")

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        identity_source = self.cleaned_data["identity_source"]

        if identity_source == IDENTITYSOURCE.ERP:
            user.set_unusable_password()
        elif identity_source == IDENTITYSOURCE.LOCAL:
            password = self.cleaned_data["password1"]
            user.set_password(password)

        if commit:
            user.save()

        return user
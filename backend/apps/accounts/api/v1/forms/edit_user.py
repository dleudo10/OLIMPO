from django import forms
from django.contrib.auth import get_user_model

from ....models import IDENTITYSOURCE

User = get_user_model()


class UserChangeForm(forms.ModelForm):
    password1 = forms.CharField(
        label="Nueva contraseña",
        widget=forms.PasswordInput,
        required=False,
    )

    password2 = forms.CharField(
        label="Confirmar nueva contraseña",
        widget=forms.PasswordInput,
        required=False,
    )

    class Meta:
        model = User
        fields = (
            "external_id",
            "full_name",
            "is_active",
            "is_staff",
            "is_superuser",
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Un usuario ERP no debería poder editarse.
        if self.instance and self.instance.pk:
            if self.instance.identity_source != IDENTITYSOURCE.LOCAL:
                for field in self.fields.values():
                    field.disabled = True

    def clean(self):
        cleaned_data = super().clean()

        # Seguridad adicional: la validación no depende solamente
        # de que los campos estén disabled.
        if self.instance.identity_source != IDENTITYSOURCE.LOCAL:
            raise forms.ValidationError(
                "Solo se pueden editar usuarios del dominio LOCAL."
            )

        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 or password2:
            if not password1:
                self.add_error(
                    "password1",
                    "Debe ingresar la nueva contraseña.",
                )

            if not password2:
                self.add_error(
                    "password2",
                    "Debe confirmar la nueva contraseña.",
                )

            if password1 and password2 and password1 != password2:
                self.add_error(
                    "password2",
                    "Las contraseñas no coinciden.",
                )

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)

        password1 = self.cleaned_data.get("password1")

        if password1:
            user.set_password(password1)

        if commit:
            user.save()

        return user

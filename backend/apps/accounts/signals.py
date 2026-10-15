from django.contrib.auth.signals import user_logged_out
from django.dispatch import receiver
from oauth2_provider.models import (
    get_access_token_model,
    get_id_token_model,
    get_refresh_token_model,
)


@receiver(user_logged_out)
def revoke_oauth_tokens_on_logout(sender, request, user, **kwargs):
    """Al cerrar sesión en OLIMPO, invalida lo emitido a todas las apps."""
    if user is None:
        return

    get_refresh_token_model().objects.filter(user=user).delete()
    get_access_token_model().objects.filter(user=user).delete()
    get_id_token_model().objects.filter(user=user).delete()
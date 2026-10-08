from django.http import HttpResponseForbidden
from oauth2_provider.contrib.rest_framework import OAuth2Authentication, TokenHasScope
from oauth2_provider.models import Application as OAuthClient
from oauth2_provider.views import AuthorizationView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AccessApplications, OIDCClient

def get_user_access(user, oauth_client):
    link = (
        OIDCClient.objects
        .select_related("application")
        .filter(oauth_client=oauth_client, application__is_active=True)
        .first()
    )
    
    if link is None:
        return None, []

    accesses = (
        AccessApplications.objects
        .filter(user=user, application=link.application)
        .select_related("role")
        .prefetch_related("role__permissions")   # ajusta al nombre real del M2M
    )
    return link.application, list(accesses)


class OlimpoAuthorizationView(AuthorizationView):
    def dispatch(self, request, *args, **kwargs):
        # Si no hay sesión, no se valida nada aquí: super() lo redirige
        # a LOGIN_URL (tu login de React) y vuelve después con ?next=...
        if request.user.is_authenticated:
            client_id = request.GET.get("client_id") or request.POST.get("client_id")
            oauth_client = OAuthClient.objects.filter(client_id=client_id).first()

            if oauth_client is None:
                return HttpResponseForbidden("Cliente OAuth desconocido.")

            _, accesses = get_user_access(request.user, oauth_client)
            if not accesses:
                return HttpResponseForbidden("No tienes acceso a este aplicativo.")

        return super().dispatch(request, *args, **kwargs)


class AppContextView(APIView):
    """
    Lo consume el BACKEND de cada app con el token del usuario.
    Devuelve identidad, roles y permisos, solo de la app dueña del token.
    """
    authentication_classes = [OAuth2Authentication]   # solo token, no cookie de sesión
    permission_classes = [TokenHasScope]
    required_scopes = ["apps"]

    def get(self, request):
        # request.auth es el AccessToken; .application es el cliente OAuth
        application, accesses = get_user_access(request.user, request.auth.application)

        if not accesses:
            return Response({"detail": "Sin acceso a este aplicativo."}, status=403)

        return Response({
            "sub": str(request.user.pk),
            "external_id": request.user.external_id,
            "full_name": request.user.full_name,
            "application": application.code,
            "roles": sorted({a.role.code for a in accesses}),
            "permissions": sorted(
                {p.code for a in accesses for p in a.role.permissions.all()}
            ),
        })
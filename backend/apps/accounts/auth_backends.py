import hmac
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.db import connections
from .models import IDENTITYSOURCE

User = get_user_model()


class LegacyCredentialsBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if not username or not password:
            return None
        
        try:
            user = User.objects.get(external_id=username.strip())
        except User.DoesNotExist:
            return None
        
        if not user.is_active:
            return None
        
        if user.identity_source == IDENTITYSOURCE.ERP:
            ok = self._verify_erp(user.external_id, password)
        elif user.identity_source == IDENTITYSOURCE.LOCAL:
            ok = user.check_password(password)
        else:
            ok = False
        return user if ok else None

    def _verify_erp(self, username, password):
        with connections["clinica"].cursor() as cursor:
            cursor.execute(
                """SELECT RTRIM(dbo.desencriptar(AUsrPsw)) FROM ADMUSR
                   WHERE AUSREST = 'S' AND dbo.desencriptar(AUsrId) = %s""",
                [username],
            )
            row = cursor.fetchone()
        if not row or row[0] is None:
            return False
        return hmac.compare_digest(row[0].upper().encode(), password.upper().encode())
        

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

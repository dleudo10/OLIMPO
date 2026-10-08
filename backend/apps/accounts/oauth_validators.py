from oauth2_provider.oauth2_validators import OAuth2Validator

class OlimpoOAuth2Validator(OAuth2Validator):
    def get_additional_claims(self, request):
        u = request.user
        return {
            "name": u.full_name,
            "preferred_username": u.external_id,
            "email": u.email,
        }
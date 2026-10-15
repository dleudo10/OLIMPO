from oauth2_provider.oauth2_validators import OAuth2Validator

class OlimpoOAuth2Validator(OAuth2Validator):
    oidc_claim_scope = {
        **OAuth2Validator.oidc_claim_scope,
        "rol": "apps",
    }
    
    
    def get_additional_claims(self, request):
        from apps.applications.oidc_views import get_user_access
        user = request.user
        
        claims = {
            "name": user.full_name,
            "preferred_username": user.external_id,
        }
        
        _, access = get_user_access(user, request.client)
        if access:
            claims["rol"] = access.role.name
            
        return claims
from django.contrib import admin
from django.urls import path, include
from apps.applications.oidc_views import OlimpoAuthorizationView, AppContextView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path("api/v1/", include("apps.accounts.api.v1.urls")),
    path("api/v1/", include("apps.applications.api.v1.urls")),
    
    path("api/v1/apps/me/", AppContextView.as_view()),
    path("o/authorize/", OlimpoAuthorizationView.as_view(), name="authorize"),  
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider"))
]
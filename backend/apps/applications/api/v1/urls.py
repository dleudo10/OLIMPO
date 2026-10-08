from django.urls import path
from .views import PortalApplicationsView

urlpatterns = [
    path("applications/", PortalApplicationsView.as_view(), name="portal-applications"),
]
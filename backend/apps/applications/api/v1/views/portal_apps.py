from rest_framework.response import Response
from rest_framework.views import APIView
from ....models import AccessApplications
from ..serializer import AccessApplicationSerializer
from rest_framework import status

class PortalApplicationsView(APIView):
    def get(self, request):
        accesses = (
            AccessApplications.objects
            .filter(user=request.user, application__is_active=True, is_active=True)
            .select_related("application", "role")
        )
        
        serializer = AccessApplicationSerializer(accesses, many=True)
        
        return Response({
            "success": True,
            "message": "Aplicaciones obtenidas correctamente.",
            "data": serializer.data,
            "errors": None
        }, status=status.HTTP_200_OK)
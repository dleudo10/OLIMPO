from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializer import UserInfoSerializer

class MeView(APIView):
    def get(self, request):
        serializer = UserInfoSerializer(request.user)
        return Response({
            "success": True,
            "message": "Usuario autenticado.",
            "data": serializer.data,
            "errors": None
        }, status=status.HTTP_200_OK)
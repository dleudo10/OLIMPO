from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ..serializer import UserInfoSerializer

@method_decorator(ensure_csrf_cookie, name="dispatch")
class CsrfView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"csrfToken": get_token(request)})

@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({
                "success": False,
                "message": "No fue posible iniciar sesión.",
                "data": None,
                "errors": {
                    "auth": [
                        "El usuario y la contraseña son obligatorios."
                    ]
                }
            }, status=status.HTTP_400_BAD_REQUEST)
            
        user = authenticate(
            request,
            username=username,
            password=password
        )
        
        if user is None:
            return Response({
                "success": False,
                "message": "No fue posible iniciar sesión.",
                "data": None,
                "errors": {
                    "auth": [
                        "El usuario o la contraseña no son correctos."
                    ]
                }
            }, status=status.HTTP_400_BAD_REQUEST)

        if not user.is_active:
            return Response({
                "success": False,
                "message": "No fue posible iniciar sesión.",
                "data": None,
                "errors": {
                    "auth": [
                        "Tu cuenta se encuentra desactivada. Comunícate con el administrador."
                    ]
                }
            }, status=status.HTTP_403_FORBIDDEN)
            
        login(request, user)
        serializer = UserInfoSerializer(user)

        return Response({
            "success": True,
            "message": "Inicio de sesión exitoso.",
            "data": {
                "user": serializer.data
            },
            "errors": None
        }, status=status.HTTP_200_OK)
        
from .base import *

# ====== MODO DE DESARROLLO ======
DEBUG = True

# ===== HOSTS PERMITIDOS ======
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
]

# ===== CONFIGURACION DE NOMBRE DE BASE DE DATOS ======
DATABASES['default']['NAME'] = BASE_DIR / 'db_development.sqlite3'

# ========== CORS ==========
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]
CORS_ALLOW_CREDENTIALS = True            # necesario para que viaje la cookie
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

CSRF_COOKIE_HTTPONLY = False             # React necesita leer csrftoken
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"

SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
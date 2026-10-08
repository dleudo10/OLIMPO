from pathlib import Path
import environ

# ========== INICIALIZAR VARIABLES DE ENTORNO ==========
env = environ.Env()

# ========== ruta base ==========
BASE_DIR = Path(__file__).resolve().parent.parent.parent

environ.Env.read_env(BASE_DIR / ".env")

# ========= CLAVE SECRETA ==========
SECRET_KEY = env('SECRET_KEY')

# ======== APLICACIONES INSTALADAS ==========
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # === LIBRERIAS ===
    'rest_framework',
    'corsheaders',
    'oauth2_provider',
    'drf_spectacular',
    'simple_history',
    
    # === APPS ===
    'apps.core',
    'apps.applications',
    'apps.authorization',
    'apps.accounts',
    'apps.audit'
]

# ======== MIDDLEWARE ==========
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'simple_history.middleware.HistoryRequestMiddleware',
]

# ======= URLS ==========
ROOT_URLCONF = 'config.urls'


# ======== TEMPLATES ==========
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# ======== DATABASES ==========
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    },
    
    'clinica': {
        'ENGINE': 'mssql', 
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
        'OPTIONS': {
            'driver': 'ODBC Driver 17 for SQL Server',
            'TrustServerCertificate': 'yes',
        },
    },
}


# ======= VALIDADORES DE CONTRASEÑA ==========
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# ======= INTERNACIONALIZACIÓN ==========
LANGUAGE_CODE = 'es-co'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True

# === ARCHIVOS ESTATICOS ===
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / "media"

# ===== CONFIGURACION DE REST FRAMEWORK ==========
AUTHENTICATION_BACKENDS = [
    "apps.accounts.auth_backends.LegacyCredentialsBackend",
]

# DRF: sesión para el portal, OAuth2 para apps externas
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "oauth2_provider.contrib.rest_framework.OAuth2Authentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}

# ===== CONFIGURACION DE OAUTH2 PROVIDER ==========
OAUTH2_PROVIDER = {
    # Scopes disponibles. 'openid' habilita el flujo OIDC.
    "SCOPES": {
        "openid": "Identidad del usuario (OIDC)",
        "profile": "Datos básicos del perfil",
        "read": "Lectura de recursos",
        "apps": "Consultar aplicativos y roles asignados",
    },
    "OIDC_ENABLED": True,
    "OIDC_RSA_PRIVATE_KEY": env("OIDC_RSA_PRIVATE_KEY"),
    # Tiempos de vida de los tokens
    "ACCESS_TOKEN_EXPIRE_SECONDS": 3600,
    "REFRESH_TOKEN_EXPIRE_SECONDS": 60 * 60 * 24 * 14,
    "ROTATE_REFRESH_TOKEN": True,
    
    "PKCE_REQUIRED": True, # PKCE obligatorio para Authorization Code (recomendado para SPAs)
    "OIDC_RP_INITIATED_LOGOUT_ENABLED": True,
    "ALLOWED_REDIRECT_URI_SCHEMES": ["http", "https"],
    "OAUTH2_VALIDATOR_CLASS": "apps.accounts.oauth_validators.OlimpoOAuth2Validator",
}

# ===== LOGIN URL DEL PORTAL ==========
LOGIN_URL = "http://localhost:5173/olimpo/auth/signin"

# ========= DOCUMENTACION =========
SPECTACULAR_SETTINGS = {
    "TITLE": "OLIMPO",
    "DESCRIPTION": "API REST de OLIMPO",
    "VERSION": "1.0.0",
}

# ========= USUARIO PERSONALIZADO =========
AUTH_USER_MODEL = "accounts.User"
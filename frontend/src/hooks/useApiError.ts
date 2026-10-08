interface ErrorMessageType {
    title: string
    description: string
};

type DRFErrorValue = string | string[];

interface DRFErrors {
    [key: string]: DRFErrorValue | undefined;

    detail?: string;
    message?: string;
    non_field_errors?: string[];
    auth?: string;
}
// type DRFErrors = Record<string, DRFErrorValue>;

export interface ApiErrorResponse {
    success: false,
    status: HttpStatusCode | null,
    title: string,
    message: string,
    description: string,
    errors: DRFErrors | null,
    errorType: string
}

type HttpStatusCode = 400 | 401 | 403 | 404 | 408 | 429 | 500 | 502 | 503 | 504;
type ConnectionErrorType = "network" | "timeout" | "offline" | "server";


const HTTP_ERROR_MESSAGES: Record<HttpStatusCode, ErrorMessageType> = {
    400: {
        title: "Solicitud Incorrecta",
        description: "Los datos enviados no son válidos. Por favor, verifica los campos e intenta nuevamente."
    },
    401: {
        title: "No Autorizado",
        description: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
    },
    403: {
        title: "Acceso Prohibido",
        description: "No tienes permiso para acceder a este recurso."
    },
    404: {
        title: "Recurso No Encontrado",
        description: "El recurso que buscas no existe o ha sido eliminado."
    },
    408: {
        title: "Tiempo de Espera Agotado",
        description: "La solicitud tardó demasiado. Por favor, intenta nuevamente."
    },
    429: {
        title: "Demasiadas Solicitudes",
        description: "Has realizado demasiadas solicitudes. Por favor, espera un momento e intenta nuevamente."
    },
    500: {
        title: "Error del Servidor",
        description: "El servidor está experimentando problemas. Por favor, intenta más tarde."
    },
    502: {
        title: "Puerta de Enlace Defectuosa",
        description: "El servidor no está disponible en este momento. Por favor, intenta más tarde."
    },
    503: {
        title: "Servicio No Disponible",
        description: "El servidor está en mantenimiento. Por favor, intenta más tarde."
    },
    504: {
        title: "Tiempo de Espera de la Puerta de Enlace",
        description: "El servidor tardó demasiado en responder. Por favor, intenta nuevamente."
    }
};

const CONNECTION_ERROR_MESSAGES: Record<ConnectionErrorType, ErrorMessageType> = {
    network: {
        title: "Error de Red",
        description: "Verifica tu conexión a internet e intenta nuevamente."
    },
    timeout: {
        title: "Conexión Agotada",
        description: "La conexión con el servidor se perdió. Por favor, intenta nuevamente."
    },
    offline: {
        title: "Sin Conexión a Internet",
        description: "No tienes conexión a internet. Por favor, verifica tu conexión e intenta nuevamente."
    },
    server: {
        title: "Problema de Conexión con el Servidor",
        description: "No se pudo conectar con el servidor. Por favor, intenta más tarde."
    }
};

interface HttpErrorData {
    message?: string;
    detail?: string;
    errors?: DRFErrors | null;
    [key: string]: unknown;
}

interface AxiosErrorLike {
    response?: {
        status: HttpStatusCode;
        data: HttpErrorData;
    };
    request?: unknown;
    message: string;
    code?: string;
}

export default function useApiError() {

    // OBTIENE INFORMACION DEL ERROR BASADO EN EL CODIGO DE ESTADO HTTP Y LOS DATOS DEVUELTOS POR EL SERVIDOR HTTP
    const getHttpError = (status: HttpStatusCode, data?: HttpErrorData ): ApiErrorResponse => {
        const errorConfig = HTTP_ERROR_MESSAGES[status] || {
            title: `Error HTTP ${status}`,
            description: "Ocurrió un error inesperado. Por favor, intenta nuevamente."
        }

        const serverMessage = data?.message || data?.detail;
        
        return {
            success: false,
            status,
            title: errorConfig.title,
            message: serverMessage || errorConfig.description,
            description: errorConfig.description,
            errors: data?.errors ?? null,
            errorType: "HTTP_ERROR"
        }

    };

    // OBTIENE INFORMACION ESPECIFICA SOBRE ERRORES BASADO DE CONEXION/RED
    const getConnectionError = (type: ConnectionErrorType): ApiErrorResponse => {
        const errorConfig = CONNECTION_ERROR_MESSAGES[type] || CONNECTION_ERROR_MESSAGES.server

        return {
            success: false,
            status: null,
            title: errorConfig.title,
            message: errorConfig.description,
            description: errorConfig.description,
            errors: null,
            errorType: "CONNECTION_" + type.toUpperCase()
        }
    }

    // DETERMINA EL TIPO DE ERROR Y OBTIENE LA INFORMACION CORRESPONDIENTE PARA MOSTRAR AL USUARIO
    const detectConnectionError = (error: AxiosErrorLike) => {
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            return "timeout";
        }

        if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
            return "network";
        }

        if (typeof navigator !== "undefined" && !navigator.onLine) {
            return "offline";
        }

        return "server";
    }


    const handleError = (error: AxiosErrorLike): ApiErrorResponse => {
        if (error.response) {
            const { status, data } = error.response;
            return getHttpError(status, data);
        }

        if (error.request) {
            const connectionType = detectConnectionError(error);
            return getConnectionError(connectionType);
        }

        const connectionErrorType = detectConnectionError(error);
        return getConnectionError(connectionErrorType);
    }


    return {getHttpError, getConnectionError, handleError}; 
}
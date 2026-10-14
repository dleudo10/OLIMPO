
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "../context/AuthContext";
import { getSafeAuthorizationUrl } from "../lib/authRedirect";

const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const authorizationUrl = getSafeAuthorizationUrl(
        params.get("next"),
    );

    useEffect(() => {
        if (!isLoading && isAuthenticated && authorizationUrl) {
            window.location.replace(authorizationUrl);
        }
    }, [isLoading, isAuthenticated, authorizationUrl]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Verificando sesión...</p>
            </div>
        );
    }

    // Ya tiene sesión y viene de una autorización OIDC.
    // El efecto continúa el flujo en el backend.
    if (isAuthenticated && authorizationUrl) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Continuando con la autorización...</p>
            </div>
        );
    }

    // Ya tiene sesión, pero entró al login directamente.
    if (isAuthenticated) {
        return <Navigate to="/applications" replace />;
    }

    // No tiene sesión: puede ver el formulario de login.
    return <Outlet />;
};

export default PublicRoute;
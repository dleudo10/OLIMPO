import { Navigate, Outlet, useLocation, } from "react-router";
import { useAuth } from "../context/AuthContext";


const ProtectedRoutes = () => {
    const { isAuthenticated, isLoading, } = useAuth();
    const location = useLocation();

    /*
     * Mientras consultamos /auth/me/
     */
    if (isLoading) {

        return (
            // CONVERTIR EN SPINNER
            <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
                <div className="text-sm text-slate-500">
                    Verificando sesión...
                </div>
            </div>
        );
    }


    /*
     * No autenticado.
     */
    if (!isAuthenticated) {

        return (
            <Navigate
                to="/auth/signin"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    /*
     * Autenticado.
     */
    return <Outlet />;
};


export default ProtectedRoutes;
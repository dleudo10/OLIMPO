import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"

import AppLayout from "../layout/AppLayout"
import ApplicationsPage from "../pages/ApplicationsPage"
import FavoritesPage from "../pages/FavoritesPage"
import NotificationsPage from "../pages/NotificationsPage"
import ProtectedRoutes from "./ProtectedRoutes"
import PublicRoute from "./PublicRoute"

const SignIn = lazy(() => import("../pages/SignIn"))

const AppRouter = () => {
    return (
        <>
            <BrowserRouter basename="/olimpo">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {/* ========================= */}
                        {/* RUTAS PROTEGIDAS */}
                        {/* ========================= */}
                        <Route element={<ProtectedRoutes />}>
                            <Route element={<AppLayout />}>
                                <Route path="/">
                                    <Route index element={<Navigate to="/applications" replace />} />
                                    <Route path="/applications" element={<ApplicationsPage />} />
                                </Route>
                                <Route path="/favorites" element={<FavoritesPage />} />
                                <Route path="/notifications" element={<NotificationsPage />} />
                            </Route>
                        </Route>

                        {/* ========================= */}
                        {/* AUTENTICACIÓN */}
                        {/* ========================= */}
                        <Route element={<PublicRoute />}>
                            <Route path="/auth/signin" element={<SignIn />} />
                        </Route>
                        
                        {/* ========================= */}
                        {/* 404 */}
                        {/* ========================= */}
                        <Route path="*" element={<div>Pagina no encontrada</div>} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default AppRouter
import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import AppLayout from "../layout/AppLayout"
import ApplicationsPage from "../pages/ApplicationsPage"
import FavoritesPage from "../pages/FavoritesPage"
import NotificationsPage from "../pages/NotificationsPage"

const SignIn = lazy(() => import("../pages/SignIn"))

const AppRouter = () => {
    return (
        <>
            <BrowserRouter basename="/olimpo">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route path="/applications" element={<ApplicationsPage />} />
                            <Route path="/favorites" element={<FavoritesPage />} />
                            <Route path="/notifications" element={<NotificationsPage />} />
                        </Route>
                        <Route path="/auth/signin" element={<SignIn />} />
                        <Route path="*" element={<div>Pagina no encontrada</div>} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default AppRouter
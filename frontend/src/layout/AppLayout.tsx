import { Outlet } from 'react-router'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import { SidebarProvider, useSidebar } from '../context/SidebarContext'


const LayoutContent = () => {
    const { collapsed } = useSidebar()

    return (
        <div className="min-h-screen bg-gray-100">
            <AppSidebar />

            <div
                className={`
                    min-h-screen
                    transition-all
                    duration-200
                    ${collapsed ? 'lg:pl-16' : 'lg:pl-64'}
                `}
            >
                <AppHeader />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

const AppLayout = () => {
    return (
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
    )
}

export default AppLayout
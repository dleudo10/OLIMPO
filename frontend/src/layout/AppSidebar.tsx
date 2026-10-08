import { NavLink } from 'react-router'
import {
    LayoutGrid,
    X,
    LogOut,
    Star,
    Bell
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useSidebar } from '../context/SidebarContext'

interface NavigationItem {
    name: string
    to: string
    icon: LucideIcon
}

const navigation: NavigationItem[] = [
    {
        name: 'Aplicaciones',
        to: '/applications',
        icon: LayoutGrid,
    },
    {
        name: 'Favoritos',
        to: '/favorites',
        icon: Star,
    },
    {
        name: 'Notificaciones',
        to: '/notifications',
        icon: Bell,
    },
]

const AppSidebar = () => {
    const {
        collapsed,
        open,
        closeSidebar,
    } = useSidebar()

    return (
        <>
            {/* Overlay únicamente en móvil */}
            {open && (
                <button
                    type="button"
                    aria-label="Cerrar menú"
                    onClick={closeSidebar}
                    className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex flex-col
                    border-r border-brand-700 bg-brand-700
                    transition-all duration-200

                    w-64
                    ${collapsed ? 'lg:w-16' : 'lg:w-64'}

                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                {/* Header */}
                <div className="relative flex h-16 items-center justify-between px-3">
                    {!collapsed && (
                        <div className="flex items-center gap-2 pl-2">
                            <div className="h-2 w-2 rounded-full bg-brand-300 shadow-[0_0_10px_rgba(126,168,255,0.8)]" />

                            <span className="font-outfit text-lg font-bold tracking-[0.18em] text-white">
                                OLIMPO
                            </span>
                        </div>
                    )}

                    {/* Cerrar en móvil */}
                    <button
                        type="button"
                        onClick={closeSidebar}
                        aria-label="Cerrar menú"
                        className="rounded-md p-2 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <X size={20} />
                    </button>

                    {/* Separador */}
                    <div className="absolute bottom-0 left-3 right-3 h-px bg-linear-to-r from-transparent via-brand-400/40 to-transparent" />

                    <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-brand-300/20 blur-md" />
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-2">
                    <h2 className="mb-2 mt-3 pl-2 text-xs text-white/60">
                        {collapsed ? '...' : 'MENU'}
                    </h2>

                    {navigation.map((item) => {
                        const Icon = item.icon

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={closeSidebar}
                                title={collapsed ? item.name : undefined}
                                className={({ isActive }) =>
                                    `
                                    flex items-center gap-3 rounded-2xl
                                    px-4 py-3 mb-2
                                    text-sm font-medium
                                    transition-colors duration-150
                                    ${
                                        isActive
                                            ? 'bg-white text-gray-900 shadow-theme-sm'
                                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }
                                    `
                                }
                            >
                                <Icon size={20} className="shrink-0" />

                                {!collapsed && <span>{item.name}</span>}
                            </NavLink>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="p-2">
                    <div className="mb-2 h-px bg-linear-to-r from-transparent via-brand-400/40 to-transparent" />

                    <button
                        type="button"
                        onClick={() => {
                            // logout()
                        }}
                        title={collapsed ? 'Cerrar sesión' : undefined}
                        className="
                            flex w-full items-center gap-3
                            rounded-2xl
                            px-4 py-3
                            text-sm font-medium
                            text-white/70
                            transition-colors duration-150
                            hover:bg-white 
                            hover:text-gray-900
                        "
                    >
                        <LogOut size={20} className="shrink-0" />

                        {!collapsed && (
                            <span>Cerrar sesión</span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    )
}

export default AppSidebar

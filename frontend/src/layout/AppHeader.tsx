import {
    Menu,
    Search,
    Bell,
    PanelRightOpen,
    PanelRightClose,
} from 'lucide-react'
import { useSidebar } from '../context/SidebarContext'

const AppHeader = () => {
    const {
        collapsed,
        toggle,
        toggleSidebar,
    } = useSidebar()

    // Temporalmente
    const user = {
        name: 'yhorjan David Leudo Padilla',
        username: '1023625189',
        initials: 'YD',
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 lg:px-6">
            {/* Menú móvil */}
            <button
                type="button"
                onClick={toggleSidebar}
                aria-label="Abrir menú"
                className="mr-3 rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
                <Menu size={22} />
            </button>

            {/* Toggle desktop */}
            <button
                type="button"
                onClick={toggle}
                aria-label={
                    collapsed
                        ? 'Expandir menú'
                        : 'Colapsar menú'
                }
                className="mr-4 hidden rounded-md p-2 text-gray-500 transition hover:bg-gray-100 lg:block"
            >
                {collapsed ? (
                    <PanelRightClose size={24} />
                ) : (
                    <PanelRightOpen size={24} />
                )}
            </button>

            <div className="flex flex-1 items-center justify-between">
                {/* Search */}
                <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                        <Search className="size-5 text-gray-500" />
                    </span>

                    <input
                        type="text"
                        placeholder="Buscar aplicaciones"
                        className="
                            h-11
                            w-full
                            rounded-lg
                            border
                            border-gray-200
                            bg-transparent
                            py-2.5
                            pl-12
                            pr-14
                            text-sm
                            text-gray-800
                            shadow-theme-xs
                            placeholder:text-gray-400
                            focus:border-brand-300
                            focus:outline-hidden
                            focus:ring-3
                            focus:ring-brand-500/10
                            xl:w-107.5
                        "
                    />
                </div>

                {/* Usuario */}
                <div className="flex items-center gap-5">
                    {/* Notificaciones */}
                    <button
                        type="button"
                        aria-label="Notificaciones"
                        className="
                            relative
                            rounded-full
                            p-2
                            text-gray-500
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                        "
                    >
                        <Bell size={21} strokeWidth={1.8} />

                        <span
                            className="
                                absolute
                                right-0
                                top-0
                                flex
                                h-4
                                min-w-4
                                items-center
                                justify-center
                                rounded-full
                                bg-brand-500
                                px-1
                                text-[10px]
                                font-semibold
                                text-white
                            "
                        >
                            3
                        </span>
                    </button>

                    {/* Información usuario */}
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-brand-500
                                text-sm
                                font-semibold
                                text-white
                            "
                        >
                            {user.initials}
                        </div>

                        {/* Nombre y usuario */}
                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-semibold text-gray-800">
                                {user.name}
                            </p>

                            <p className="text-xs text-gray-500">
                                {user.username}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader

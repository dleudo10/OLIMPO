import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'

interface SidebarContextValue {
    collapsed: boolean
    open: boolean
    toggle: () => void
    openSidebar: () => void
    closeSidebar: () => void
    toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(
    undefined
)

interface SidebarProviderProps {
    children: ReactNode
}

export const SidebarProvider = ({
    children,
}: SidebarProviderProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setCollapsed((prev) => !prev)
    }

    const openSidebar = () => {
        setOpen(true)
    }

    const closeSidebar = () => {
        setOpen(false)
    }

    const toggleSidebar = () => {
        setOpen((prev) => !prev)
    }

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                open,
                toggle,
                openSidebar,
                closeSidebar,
                toggleSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)

    if (!context) {
        throw new Error(
            'useSidebar debe utilizarse dentro de un SidebarProvider'
        )
    }

    return context
}
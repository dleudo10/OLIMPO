// alerts/AlertContext.tsx
import { createContext, useContext, useState } from "react";

export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertItem {
    id: string;
    variant: AlertVariant;
    title: string;
    message: string;
    duration?: number;
    showLink?: boolean;
    linkHref?: string;
    linkText?: string;
}

interface AlertContextType {
    visibleAlerts: AlertItem[];
    pushAlert: (alert: Omit<AlertItem, "id">) => void;
    removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

const MAX_VISIBLE_ALERTS = 3;

const generateAlertId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [queue, setQueue] = useState<AlertItem[]>([]);

    const pushAlert = (alert: Omit<AlertItem, "id">) => {
        setQueue((prev) => [
            ...prev,
            { ...alert, id: generateAlertId() },
        ]);
    };

    const removeAlert = (id: string) => {
        setQueue((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <AlertContext.Provider
            value={{
                visibleAlerts: queue.slice(0, MAX_VISIBLE_ALERTS),
                pushAlert,
                removeAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export const useAlertContext = () => {
    const ctx = useContext(AlertContext);
    if (!ctx) {
        throw new Error("useAlertContext debe usarse dentro de AlertProvider");
    }
    return ctx;
};

// alerts/AlertContainer.tsx
import { useEffect } from "react";
import { useAlertContext } from "../../../context/AlertContext";
import Alert from "./Alert";

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


export const AlertContainer = () => {
    const { visibleAlerts, removeAlert } = useAlertContext();

    useEffect(() => {
        visibleAlerts.forEach((alert) => {
            if (!alert.duration) return;

            const timer = setTimeout(() => {
                removeAlert(alert.id);
            }, alert.duration);

            return () => clearTimeout(timer);
        });
    }, [visibleAlerts, removeAlert]);

    return (
        <div className="fixed right-6 top-6 z-999999 flex flex-col gap-3 w-90">
            {visibleAlerts.map((alert) => (
                <Alert
                    key={alert.id}
                    {...alert}
                    onClose={() => removeAlert(alert.id)}
                />
            ))}
        </div>
    );
};

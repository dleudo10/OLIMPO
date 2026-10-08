import { useAlertContext, type AlertVariant } from "../context/AlertContext";

export const useAlert = () => {
    const { pushAlert } = useAlertContext();

    type AlertOptions = Partial<
        Omit<Parameters<typeof pushAlert>[0], "variant" | "title" | "message">
    >;

    const show = (
        variant: AlertVariant,
        title: string,
        message: string,
        options?: AlertOptions
    ) => {
        pushAlert({
            variant,
            title,
            message,
            duration: 5000,
            ...options,
        });
    };

    return {
        success: (t: string, m: string, o?: AlertOptions) => show("success", t, m, o),
        error: (t: string, m: string, o?: AlertOptions) => show("error", t, m, o),
        warning: (t: string, m: string, o?: AlertOptions) => show("warning", t, m, o),
        info: (t: string, m: string, o?: AlertOptions) => show("info", t, m, o),
    };
};

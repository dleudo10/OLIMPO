import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { me } from "../services/auth.api";
import { SSOApi } from "../lib/sso";
import type { User } from "../types/auth.types";

type AuthStatus =
    | "loading"
    | "authenticated"
    | "unauthenticated";

type AuthContextValue = {
    user: User | null;
    status: AuthStatus;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    refreshUser: () => Promise<User | null>;
};

const AuthContext = createContext< AuthContextValue | undefined >(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUserState] = useState<User | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    const setUser = useCallback((nextUser: User | null) => {
        setUserState(nextUser);
        setStatus(nextUser ? "authenticated" : "unauthenticated");
    }, []);

    const refreshUser = useCallback( async (): Promise<User | null> => {

        try {
            const response = await me();

            if (!response.success || !response.data) {
                setUser(null);
                return null;
            }

            setUser(response.data);
            return response.data;
        } catch (error) {
            const code = (error as { response?: { status?: number } })
                ?.response?.status;

            if (code === 401 || code === 403) {
                setUser(null);
            } else {
                setStatus((prev) =>
                    prev === "loading" ? "unauthenticated" : prev,
                );
            }

            return null;
        }
    }, [setUser]);

    
    useEffect(() => {
        void refreshUser();
    }, [refreshUser]);

    useEffect(() => {
        if (status !== "authenticated") return;

        const revalidate = () => {
            if (document.visibilityState === "visible") {
                void refreshUser();
            }
        };

        document.addEventListener("visibilitychange", revalidate);
        window.addEventListener("focus", revalidate);

        return () => {
            document.removeEventListener("visibilitychange", revalidate);
            window.removeEventListener("focus", revalidate);
        };
    }, [status, refreshUser]);

    useEffect(() => {
        const id = SSOApi.interceptors.response.use(
            (response) => response,
            (error: { response?: { status?: number }; config?: { url?: string } }) => {
                const code = error?.response?.status;
                const url = error?.config?.url ?? "";

                if ((code === 401 || code === 403) && !url.includes("/auth/")) {
                    void refreshUser();
                }

                return Promise.reject(error);
            },
        );

        return () => SSOApi.interceptors.response.eject(id);
    }, [refreshUser]);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            status,
            isLoading: status === "loading",
            isAuthenticated: status === "authenticated",
            setUser,
            refreshUser,
        }),
        [ user, status, refreshUser, ],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = (): AuthContextValue => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de <AuthProvider />",
        );
    }

    return context;
};
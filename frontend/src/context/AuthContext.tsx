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
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");


    const refreshUser = useCallback(
        async (): Promise<User | null> => {

            try {

                const response = await me();

                if ( !response.success || !response.data ) {
                    setUser(null);
                    setStatus("unauthenticated");
                    return null;
                }
                setUser(response.data);
                setStatus("authenticated");
                return response.data;

            } catch {
                setUser(null);
                setStatus("unauthenticated");
                return null;
            }
        },
        [],
    );

    
    useEffect(() => {
        void refreshUser();
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
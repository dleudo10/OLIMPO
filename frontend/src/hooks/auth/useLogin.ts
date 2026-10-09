import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/auth.api";

import type { LoginPayload, } from "../../types/auth.types";


export const useLogin = () => {
    const { setUser, refreshUser, } = useAuth();

    return useMutation({
        mutationFn: ( payload: LoginPayload ) => login(payload),
        onSuccess: async (response) => {

            if ( response.success && response.data ) {
                setUser( response.data.user );
            }

            await refreshUser();
        },
    });
};
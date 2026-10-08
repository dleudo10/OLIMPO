import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "../../types/auth.types";
import { login } from "../../services/auth.api";

export const useLogin = () => {
    const { setUser, setTimeRefresh } = useAuth()

    return useMutation({
        mutationFn: (payload: LoginPayload) => login(payload), 
        onSuccess: (data) => {

            // if (data.data?.access) {
            //     setToken(data.data?.access)
            //     const decoded = decodeToken(data.data.access)
            //     setTimeRefresh(data.data?.access_expires_in)
            //     if (decoded) {
            //         setUser({
            //             id: decoded.id,
            //             external_id: decoded.external_id,
            //             name: decoded.name,
            //             role: decoded.role,
            //             role_name: decoded.role_name,
            //             permissions: decoded.permissions
            //         })
            //     }
            // }
            
        }
    })    
}
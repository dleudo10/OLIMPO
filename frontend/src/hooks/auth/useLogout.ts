import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "../../services/auth.api";
import { useAuth } from "../../context/AuthContext";


export const useLogout = () => {
    const { setUser, } = useAuth();
    const navigate = useNavigate();


    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            /*
             * Eliminamos el usuario
             * del estado React.
             *
             * La cookie de sesión ya fue
             * invalidada por Django.
             */
            setUser(null);


            /*
             * Volvemos al login.
             */
            navigate( 
                "/auth/signin", 
                { replace: true, }, 
            );
        },
        onError: (error) => {
            console.log("Error during logout:", error);
        }
    });
};
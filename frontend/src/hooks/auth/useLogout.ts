import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "../../services/auth.api";
import { useAuth } from "../../context/AuthContext";


export const useLogout = () => {
    const { setUser, } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            queryClient.clear();
            setUser(null);
            navigate("/auth/signin", { replace: true });
        },
    });
};
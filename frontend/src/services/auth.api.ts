import { SSOApi } from "../lib/sso";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await SSOApi.post<LoginResponse>("/auth/login/", payload)
    console.log(response.data)
    return response.data;
}

export const logout = async (): Promise<void> => {
    const response = await SSOApi.post("/auth/logout/")
    return response.data; 
}
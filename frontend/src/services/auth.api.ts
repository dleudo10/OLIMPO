import { SSOApi } from "../lib/sso";
import type { LoginPayload, LoginResponse, MeResponse } from "../types/auth.types";

export const getCsrf = async (): Promise<void> => {
    await SSOApi.get("/v1/auth/csrf/");
};

export const login = async ( payload: LoginPayload ): Promise<LoginResponse> => {
    await getCsrf();
    const response = await SSOApi.post<LoginResponse>( "/v1/auth/login/", payload );
    return response.data;
};

export const me = async (): Promise<MeResponse> => {
    const response = await SSOApi.get<MeResponse>("/v1/auth/me/");
    return response.data;
}

export const logout = async (): Promise<void> => {
    await getCsrf();
    await SSOApi.post("/v1/auth/logout/");
};
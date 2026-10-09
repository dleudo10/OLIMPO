import type { ApiResponse } from "./api.types";

export type LoginPayload = {
	username: string;
	password: string;
}

export type User = {
    id: number;
    external_id: string;
    full_name: string | null;
    email: string | null;
    identity_source: "ERP" | "LOCAL" | string;
    is_active: boolean;
    is_staff: boolean;
};

export type LoginData = {
    user: User;
};

export type LoginResponse = ApiResponse<LoginData>;

export type MeResponse = ApiResponse<User>
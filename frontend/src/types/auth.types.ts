import type { ApiResponse } from "./api.types";

export type LoginPayload = {
	username: string;
	password: string;
}

export type LoginResponse = ApiResponse<null>
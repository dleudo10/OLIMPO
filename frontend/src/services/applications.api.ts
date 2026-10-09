import { SSOApi } from "../lib/sso";
import type { ApiResponse } from "../types/api.types";
import type { ApplicationCardProps } from "../types/applications.type";

type ServiceProps = {
    signal?: AbortSignal;
};

interface Application extends ApplicationCardProps {
    id: number;
}

export const getApplications = async ({signal}: ServiceProps): Promise<ApiResponse<Application[]>> => {
    const { data } = await SSOApi.get<ApiResponse<Application[]>>("v1/applications/", { signal } );
    return data;
};


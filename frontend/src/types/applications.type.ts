import type { ReactNode } from "react";

export type ApplicationStatus =
    | "available"
    | "soon"
    | "new";

export interface RoleApplication {
    name: string;
}

export interface Application {
    id: string;
    name: string;
    category: string;
    description: string;
    status: ApplicationStatus;
    icon: ReactNode;
    url_base: string;
}

export interface ApplicationCardProps {
    application: Application;
    role: RoleApplication;
}

const AUTHORIZATION_PATH = "/o/authorize/";

export function getSafeAuthorizationUrl(
    next: string | null | undefined,
): string | null {
    if (
        !next ||
        !next.startsWith("/") ||
        next.startsWith("//") ||
        next.includes("\\")
    ) {
        return null;
    }

    try {
        const apiBaseUrl = import.meta.env.VITE_API_SSO_URL;

        if (!apiBaseUrl) {
            return null;
        }

        const backendOrigin = new URL(apiBaseUrl).origin;
        const target = new URL(next, backendOrigin);

        // Solo se permite continuar hacia la autorización OIDC de OLIMPO.
        if (
            target.origin !== backendOrigin ||
            target.pathname !== AUTHORIZATION_PATH ||
            target.username ||
            target.password
        ) {
            return null;
        }

        return target.toString();
    } catch {
        return null;
    }
}
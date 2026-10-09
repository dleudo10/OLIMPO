import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_SSO_URL;

export const SSOApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    withXSRFToken: true,
})
import axios from "axios";
import { useAuthStore } from "./authStore";

// vite only exposes env vars prefixed with VITE_ to client code
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

// ice-service and payment-service both require the Bearer token, but none of
// the api/*.ts call sites were attaching it - this interceptor covers all of
// them in one place instead of threading authHeader() through every call.
axios.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

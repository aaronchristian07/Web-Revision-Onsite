import axios from "axios";
import { useAuthStore } from "./authStore";

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

axios.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

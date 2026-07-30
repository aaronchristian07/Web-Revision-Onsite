// vite only exposes env vars prefixed with VITE_ to client code
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

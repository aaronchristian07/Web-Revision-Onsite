import axios from "axios";

export const parseApiError = (err: unknown): string => {
    const fallback = "An unexpected error occurred."
    if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        return data?.message ?? data?.error ?? fallback;
    }
    if (err instanceof Error) return err.message;
    return fallback;
};
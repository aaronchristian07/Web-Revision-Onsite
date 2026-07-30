import axios from "axios";
import type {
    AuthResponse,
    LoginRequest,
    MessageResponse,
    RegisterRequest,
} from "../dto/authDto";
import { API_BASE_URL } from "../lib/api";
import { parseApiError } from "../lib/error";
import { useAuthStore } from "../lib/authStore";

interface LoginApiProps {
    req: LoginRequest;
    setError: (error: string) => void;
}

export const loginApi = async ({ req, setError }: LoginApiProps): Promise<AuthResponse | null> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_BASE_URL}/auth/login`,
            req
        )
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (err) {
        setError(parseApiError(err))
        return null;
    }
}

interface RegisterApiProps {
    req: RegisterRequest;
    setError: (error: string) => void;
}

export const registerApi = async ({ req, setError }: RegisterApiProps): Promise<MessageResponse | null> => {
    try {
        const response = await axios.post<MessageResponse>(
            `${API_BASE_URL}/auth/register`,
            req
        )
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (err) {
        setError(parseApiError(err))
        return null;
    }
}

export function authHeader() {
    // .getState() reads the store directly instead of subscribing - this is
    // called from plain async functions, not React components, so the hook
    // form (useAuthStore(...)) would violate the rules of hooks.
    const token = useAuthStore.getState().accessToken;
    return { Authorization: `Bearer ${token}` };
}
import axios from "axios";
import type { AuthResponse, LoginRequest } from "../dto/authDto";
import { API_BASE_URL } from "../lib/api";
import { parseApiError } from "../lib/error";

interface LoginApiProps {
    req: LoginRequest;
    setError: (error: string) => void;
}

export const loginApi = async({req, setError}: LoginApiProps): Promise<AuthResponse | null> => {
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
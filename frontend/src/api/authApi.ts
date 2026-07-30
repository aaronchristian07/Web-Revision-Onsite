import axios from "axios";
import type { AuthResult, LoginRequest, RegisterRequest } from "../dto/authDto";
import { API_BASE_URL } from "../lib/api";

// Wire format actually returned by auth-service (snake_case) — mapped below
// into the camelCase AuthResult the rest of the app works with.
interface RawAuthResponse {
    access_token: string;
    refresh_token: string;
    user_id: string;
    role: string;
}

function mapAuthResponse(raw: RawAuthResponse): AuthResult {
    return {
        user: { userId: raw.user_id, role: raw.role },
        accessToken: raw.access_token,
        refreshToken: raw.refresh_token,
    };
}

export async function login(payload: LoginRequest): Promise<AuthResult> {
    const { data } = await axios.post<RawAuthResponse>(`${API_BASE_URL}/auth/login`, payload);
    return mapAuthResponse(data);
}

export async function register(payload: RegisterRequest): Promise<AuthResult> {
    const { data } = await axios.post<RawAuthResponse>(`${API_BASE_URL}/auth/register`, payload);
    return mapAuthResponse(data);
}

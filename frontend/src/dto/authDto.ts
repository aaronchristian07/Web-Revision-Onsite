// Wire shapes below mirror the Go service exactly (snake_case). They get
// mapped into the camelCase `User` in authStore so components never see
// snake_case.

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user_id: string;
    role: string;
}

export interface MessageResponse {
    message: string;
}

export interface User {
    userId: string;
    role: string;
    // only /auth/me returns these; login does not
    email?: string;
    username?: string;
}

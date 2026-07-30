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
    username: string;
    email: string;
    role: string;
}

export interface MessageResponse {
    message: string;
}

export interface User {
    userId: string;
    role: string;
    // optional because sessions persisted before login started returning
    // these still sit in localStorage without them
    email?: string;
    username?: string;
}

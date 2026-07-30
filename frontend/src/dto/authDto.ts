export interface User {
    userId: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    username: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

export interface AuthResult {
    user: User;
    accessToken: string;
    refreshToken: string;
}

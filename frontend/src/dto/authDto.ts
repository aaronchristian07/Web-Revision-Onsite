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
    avatar_url: string;
}

export interface MessageResponse {
    message: string;
}

export interface User {
    userId: string;
    role: string;
    email?: string;
    username?: string;
    avatarUrl?: string;
}

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar_url: string;
}

export interface UpdateProfileRequest {
    username: string;
}

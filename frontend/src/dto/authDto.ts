export interface User {
    userID: number;
    username: string
    role: string;

    // adjust accordingly
}

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
}
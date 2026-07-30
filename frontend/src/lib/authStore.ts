import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse, User } from "../dto/authDto";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    setSession: (res: AuthResponse) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,

            // single place the API's snake_case gets translated
            setSession: (res) =>
                set({
                    user: {
                        userId: res.user_id,
                        role: res.role,
                        username: res.username,
                        email: res.email,
                    },
                    accessToken: res.access_token,
                    refreshToken: res.refresh_token,
                }),

            logout: () =>
                set({ user: null, accessToken: null, refreshToken: null }),
        }),
        { name: "eskrim-auth" },
    ),
);

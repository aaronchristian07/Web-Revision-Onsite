import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse, User } from "../dto/authDto";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    setSession: (res: AuthResponse) => void;
    updateUser: (patch: Partial<User>) => void;
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
                        avatarUrl: res.avatar_url,
                    },
                    accessToken: res.access_token,
                    refreshToken: res.refresh_token,
                }),

            // merges a partial (e.g. after a profile edit) without touching tokens
            updateUser: (patch) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...patch } : state.user,
                })),

            logout: () =>
                set({ user: null, accessToken: null, refreshToken: null }),
        }),
        { name: "eskrim-auth" },
    ),
);

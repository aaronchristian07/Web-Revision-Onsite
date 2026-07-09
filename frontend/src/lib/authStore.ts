import { create } from "zustand";
import type { User } from "../dto/authDto";

interface AuthState {
    user: User | null;
	accessToken: string
    setUser: (user: User) => void;
    setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    setUser: (user) => set({ user: user }),
    setAccessToken: (token) => set({ accessToken: token }),
}))
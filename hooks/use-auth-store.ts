import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  name: string;
  email: string;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  name: "",
  email: "",
  signIn: (email, name) =>
    set({ isAuthenticated: true, email, name: name ?? email.split("@")[0] }),
  signOut: () => set({ isAuthenticated: false, name: "", email: "" }),
}));

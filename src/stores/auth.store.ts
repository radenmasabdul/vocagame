import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  isHydrated: boolean;
  token: string | null;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isHydrated: false,
      token: null,
      email: null,
      login: (token, email) =>
        set({
          isAuthenticated: true,
          token,
          email,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          token: null,
          email: null,
        }),
      setHydrated: (value) =>
        set({
          isHydrated: value,
        }),
    }),
    {
      name: "vocagame-auth",
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated(true);
        };
      },
    },
  ),
);
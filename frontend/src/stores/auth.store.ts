import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'PATIENT' | 'COUNSELOR';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoading: false,
      setAuth: (user, accessToken) =>
        set({ user, accessToken, isLoading: false }),
      logout: () =>
        set({ user: null, accessToken: null, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

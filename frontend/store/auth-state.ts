import { create } from "zustand";
import { getMe, logout as logoutApi  } from "@/api";
import type { User } from "@/types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  // set user
  setUser: (user) => set({ user, isAuthenticated: !!user, loading: false, }),
  // fetch user
  fetchUser: async () => {
    try {
      const res = await getMe();
      set({ user: res.data, isAuthenticated: true, loading: false, });
    } catch {
      set({ user: null, isAuthenticated: false, loading: false, });
    }
  },
  // log user out
  logout: async () => {
    await logoutApi();
    set({ user: null, isAuthenticated: false, });
  },
}));

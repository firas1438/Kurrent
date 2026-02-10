import { create } from "zustand";
import { getMe, logout as logoutApi } from "@/api";
import { toast } from "@/hooks/use-toast";
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

  // set user and mark auth as loaded.
  setUser: (user) => set({ user, isAuthenticated: !!user, loading: false }),

  // fetch current user; if it fails (e.g. expired session/protected routes), clear auth and show an error toast.
  fetchUser: async () => {
    try {
      const res = await getMe();
      set({ user: res.data, isAuthenticated: true, loading: false });
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
      toast({ title: "Access Restricted", description: "Please sign in to verify your access.", variant: "destructive", });
    }
  },

  // log user out on the server and clear local auth state.
  logout: async () => {
    await logoutApi();
    set({ user: null, isAuthenticated: false });
  },
  
}));
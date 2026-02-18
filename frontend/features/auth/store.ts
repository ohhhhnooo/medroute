import { create } from "zustand";
import type { Dispatcher } from "@/types";
import { mockAPI } from "@/lib/api/mock-api";

interface AuthStore {
  dispatcher: Dispatcher | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  dispatcher: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (username, password) => {
    try {
      set({ isLoading: true });
      const dispatcher = await mockAPI.login(username, password);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("medroute_auth", JSON.stringify(dispatcher));
        document.cookie = "auth_session=true; path=/; max-age=86400"; // 24 hours
      }

      set({
        dispatcher,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Login failed:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("medroute_auth");
      document.cookie = "auth_session=; path=/; max-age=0";
    }

    set({
      dispatcher: null,
      isAuthenticated: false,
    });
  },

  initialize: () => {
    // Try to restore session from localStorage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("medroute_auth");
        if (stored) {
          const dispatcher = JSON.parse(stored);
          set({
            dispatcher,
            isAuthenticated: true,
          });
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
      }
    }
  },
}));

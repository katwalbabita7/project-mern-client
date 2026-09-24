import { Role } from "@/app/types/enum.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id?: string;
  id?: string;
  email: string;
  role: Role | string;
  full_name?: string;
  name?: string;
  phone?: string;
  profile_image?: { path?: string; publicId?: string };
}

interface ClientAuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  isUser: () => boolean;
}

export const useClientAuthStore = create<ClientAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("client_token", token);
          localStorage.setItem("token", token);
        }
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      setUser: (user) => {
        set((state) => ({
          ...state,
          user: { ...state.user, ...user },
        }));
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("client_token");
          localStorage.removeItem("token");
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      isUser: () => {
        const user = get().user;
        return user?.role === Role.USER;
      },
    }),
    {
      name: "client-auth-storage",
    }
  )
);

export const useAuthStore = useClientAuthStore;
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

interface AdminAuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_token", token);
        }
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
    
    // cookie clear
    document.cookie = "access_token=; path=/; max-age=0";
  }
  set({
    user: null,
    token: null,
    isAuthenticated: false,
  });
},

      isAdmin: () => {
        const user = get().user;
        return user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN;
      },
    }),
    {
      name: "admin-auth-storage",
    }
  )
);
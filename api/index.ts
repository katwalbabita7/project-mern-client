
import axios from "axios";
import { useClientAuthStore } from "@/store/clientAuthStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    let token: string | null = null;
    if (typeof window !== "undefined") {
      if (window.location.pathname.startsWith("/admin")) {
        token =
          localStorage.getItem("admin_token") ||
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken") ||
          localStorage.getItem("client_token");
      } else {
        token =
          localStorage.getItem("client_token") ||
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken") ||
          localStorage.getItem("admin_token");
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message;
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || "";
    const isAuthRoute =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/admin/auth/login");

    if (
      status === 401 ||
      message === "Token has expired" ||
      message === "jwt expired" ||
      message === "Unauthorized" ||
      message === "Invalid token"
    ) {
      if (typeof window !== "undefined") {
        const isAdmin = window.location.pathname.startsWith("/admin");

        // Client auth store clear
        useClientAuthStore.getState().logout();

        localStorage.removeItem("admin_token");
        localStorage.removeItem("accessToken");

        // Redirect
        if (isAdmin) {
          window.location.href = "/admin/login";
        } else {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
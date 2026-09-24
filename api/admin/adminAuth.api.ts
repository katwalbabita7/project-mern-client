import { AdminLoginFormData } from "@/schemas/admin/login.schema";
import api from "..";

// * admin login
export const adminLogin = async (data: AdminLoginFormData) => {
  const response = await api.post("/admin/auth/login", data);
  return response.data;
};

// * admin logout
export const adminLogout = async () => {
  const response = await api.post("/admin/auth/logout");
  return response.data;
};
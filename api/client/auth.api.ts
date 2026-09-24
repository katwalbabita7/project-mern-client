import { LoginFormData, RegisterFormData } from "@/schemas/client/auth.schema";
import api from "..";

// * login user
export const login = async (data: LoginFormData) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// * sign-up user
export const signUp = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.phone) formData.append("phone", data.phone);

    const file =
      data.profile_image instanceof File
        ? data.profile_image
        : data.profile_image?.[0] instanceof File
        ? data.profile_image[0]
        : null;

    if (file) {
      formData.append("profile_image", file);
    }

    const response = await api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// * get current user profile
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// * logout user
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// * change password
export const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
  try {
    const response = await api.patch("/auth/change-password", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// * change email
export const changeEmail = async (data: { newEmail: string; password: string }) => {
  try {
    const response = await api.patch("/auth/change-email", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// * delete account
export const deleteAccount = async () => {
  try {
    const response = await api.delete("/auth/account");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
// * forgot password - send OTP
export const forgotPassword = async (data: { email: string }) => {
  try {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// * verify OTP
export const verifyOTP = async (data: { email: string; otp: string }) => {
  try {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// * reset password
export const resetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  try {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
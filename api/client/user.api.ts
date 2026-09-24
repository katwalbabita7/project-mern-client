import api from "..";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

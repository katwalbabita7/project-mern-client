import api from "..";

export const getClientCategories = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  parent?: string;
}) => {
  try {
    const response = await api.get("/categories", { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

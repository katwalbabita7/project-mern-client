
import { CategoryFormData } from "@/app/types/admin/category.form";
import api from "..";

//* create category
export const createCategory = async (data: FormData) => {
  try {
    const response = await api.post("/admin/categories", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * update category
export const updateCategory = async (id: string, data: FormData) => {
  try {
    const response = await api.put(`/admin/categories/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * get single category
export const getCategoryById = async (id: string) => {
  try {
    const response = await api.get(`/admin/categories/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
// * get all categories
export const getAllCategories = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const response = await api.get("/admin/categories", { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const getCategories = getAllCategories;

// * delete category
export const deleteCategory = async (id: string) => {
  try {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

import api from "..";

export const getAllProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
}) => {
  try {
    const response = await api.get("/products", { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getFeaturedProducts = async (limit: number = 8) => {
  try {
    const response = await api.get("/products/featured", { params: { limit } });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getNewArrivals = async (limit: number = 8) => {
  try {
    const response = await api.get("/products/new-arrivals", { params: { limit } });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getProductsByCategory = async (
  category: string,
  params?: { page?: number; limit?: number }
) => {
  try {
    const response = await api.get(`/products/category/${category}`, { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getProductsByBrand = async (
  brand: string,
  params?: { page?: number; limit?: number }
) => {
  try {
    const response = await api.get(`/products/brand/${brand}`, { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

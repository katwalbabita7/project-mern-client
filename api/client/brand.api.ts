import api from "..";

export const getClientBrands = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const response = await api.get("/brands", { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getBrandById = async (id: string) => {
  try {
    const response = await api.get(`/brands/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

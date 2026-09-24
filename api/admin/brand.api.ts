import { BrandFormData } from "@/app/types/admin/brand.form";
import api from "..";

// Helper: create FormData
const buildBrandFormData = (data: BrandFormData) => {
  const formData = new FormData();

  formData.append("name", data.name);

  if (data.description) {
    formData.append("description", data.description);
  }

  // isActive boolean → convert into string
  formData.append("isActive", String(data.isActive ?? true));

  // only logo File append
  if (data.logo instanceof File) {
    formData.append("logo", data.logo);
  }

  return formData;
};

// * create brand
export const createBrand = async (data: BrandFormData) => {
  try {
    const formData = buildBrandFormData(data);

    const response = await api.post("/admin/brands", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * update brand
export const updateBrand = async (id: string, data: BrandFormData) => {
  try {
    const formData = buildBrandFormData(data);

    const response = await api.put(`/admin/brands/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * get single brand
export const getBrandById = async (id: string) => {
  try {
    const response = await api.get(`/admin/brands/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * get all brands
export const getBrands = async (params?: any) => {
  try {
    const response = await api.get("/admin/brands", { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * delete brand
export const deleteBrand = async (id: string | number) => {
  try {
    const response = await api.delete(`/admin/brands/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
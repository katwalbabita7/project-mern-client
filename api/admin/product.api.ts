import { ProductFormData } from "@/app/types/admin/product.form";
import api from "..";

// create FormData helper function
const buildProductFormData = (data: ProductFormData) => {
  const formData = new FormData();

  // Required fields
  formData.append("name", data.name);
  formData.append("price", String(data.price));
  formData.append("stock", String(data.stock));
  formData.append("brand", data.brand);
  formData.append("category", data.category);

  // Optional fields
  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.discountPrice != null && data.discountPrice !== undefined && String(data.discountPrice).trim() !== "" && !isNaN(Number(data.discountPrice))) {
    formData.append("discountPrice", String(data.discountPrice));
  }

  if (data.sku && data.sku.trim()) {
    formData.append("sku", data.sku.trim());
  }
  // Convert boolean or string to real boolean
  const isActive =
    data.isActive === true || data.isActive === "true" || data.isActive === "1";
  formData.append("isActive", String(isActive));

  // Tags
  if (data.tags) {
    let tagsArray: string[] = [];

    if (typeof data.tags === "string") {
      // form sends string → convert to array
      tagsArray = data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(data.tags)) {
      tagsArray = data.tags;
    }

    if (tagsArray.length > 0) {
      formData.append("tags", JSON.stringify(tagsArray));
    }
  }

  // Main Image (only if it's a real File)
if (data.image instanceof File) {
  formData.append("images", data.image);
}

// Multiple Images
if (data.images && Array.isArray(data.images)) {
  data.images.forEach((img) => {
    if (img instanceof File) {
      formData.append("images", img);
    }
  });
}
return formData; 
};

// * create product
export const createProduct = async (data: ProductFormData) => {
  try {
    const formData = buildProductFormData(data);

    const response = await api.post("/admin/products", formData);

    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const updateProduct = async (id: string, data: ProductFormData) => {
  try {
    // नयाँ image select गरेको छ कि छैन check गर्ने
    const hasNewImage =
      data.image instanceof File ||
      (Array.isArray(data.images) &&
        data.images.some((img) => img instanceof File));

    if (hasNewImage) {
      // नयाँ image छ → FormData पठाउने
      const formData = buildProductFormData(data);
      const response = await api.put(`/admin/products/${id}`, formData);
      return response.data;
    } else {
      // नयाँ image छैन → normal JSON पठाउने
      const payload = {
        name: data.name,
        price: Number(data.price),
        stock: Number(data.stock),
        brand: data.brand,
        category: data.category,
        description: data.description || undefined,
        discountPrice:
  data.discountPrice != null && !isNaN(Number(data.discountPrice))
    ? Number(data.discountPrice)
    : undefined,
        sku: data.sku?.trim() || undefined,
        isActive:
          data.isActive === true ||
          data.isActive === "true" ||
          data.isActive === "1",
        tags: data.tags,
      };

      const response = await api.put(`/admin/products/${id}`, payload);
      return response.data;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * get single product
export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/admin/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * get all products
export const getProducts = async (params?: any) => {
  try {
    const response = await api.get("/admin/products", { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// * delete product
export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
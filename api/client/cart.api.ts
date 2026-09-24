import api from "..";

export const getMyCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const addToCart = async (data: {
  product: string;
  quantity?: number;
  price?: number;
  variant?: string;
}) => {
  try {
    const response = await api.post("/cart/add", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const updateCartItem = async (
  productId: string,
  data: { quantity: number; variant?: string }
) => {
  try {
    const response = await api.put(`/cart/${productId}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const removeFromCart = async (
  productId: string,
  variant?: string
) => {
  try {
    const response = await api.delete(`/cart/${productId}`, {
      data: { variant },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const clearCart = async () => {
  try {
    const response = await api.delete("/cart");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

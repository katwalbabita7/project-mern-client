import api from "..";

export const getMyWishlist = async () => {
  try {
    const response = await api.get("/wishlist");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const addToWishlist = async (productId: string) => {
  try {
    const response = await api.post("/wishlist/add", { productId });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const removeFromWishlist = async (productId: string) => {
  try {
    const response = await api.post("/wishlist/remove", { productId });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

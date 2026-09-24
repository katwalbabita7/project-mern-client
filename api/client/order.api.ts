import api from '..';
import { ICreateOrderPayload } from '@/app/types/order.types';

// Create a new order (Cash on Delivery)
export const createOrder = async (data: ICreateOrderPayload) => {
  try {
    const response = await api.post('/orders', data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// Get current logged-in user's orders
export const getMyOrders = async () => {
  try {
    const response = await api.get('/orders/my-orders');
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// Get single order details
export const getOrderById = async (id: string) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

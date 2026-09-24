import api from '..';
import { IOrderStatusUpdatePayload } from '@/app/types/order.types';

export interface IGetOrdersParams {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  search?: string;
}

// Get all orders with filtering and pagination (Admin)
export const getAllOrders = async (params: IGetOrdersParams = {}) => {
  try {
    const response = await api.get('/orders/admin/all', { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// Update order status and/or payment status (Admin)
export const updateOrderStatus = async (
  orderId: string,
  data: IOrderStatusUpdatePayload
) => {
  try {
    const response = await api.patch(`/orders/admin/${orderId}/status`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// Get single order details (Admin)
export const getAdminOrderById = async (orderId: string) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

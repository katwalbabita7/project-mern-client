import { OrderStatus, PaymentMethod, PaymentStatus } from './enum.types';

export interface IOrderItem {
  _id?: string;
  product:
    | string
    | {
        _id: string;
        name: string;
        images?: { path: string }[];
        image?: { path: string };
        price?: number;
        discountPrice?: number;
      };
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image?: string;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  postalCode?: string;
  state?: string;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  user:
    | string
    | {
        _id: string;
        full_name?: string;
        name?: string;
        email: string;
        phone?: string;
      };
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: PaymentMethod | string;
  paymentStatus: PaymentStatus | string;
  orderStatus: OrderStatus | string;
  itemsPrice: number;
  shippingFee: number;
  totalAmount: number;
  notes?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateOrderPayload {
  shippingAddress: IShippingAddress;
  paymentMethod?: PaymentMethod | string;
  notes?: string;
  items?: Array<{
    product: string;
    quantity: number;
    variant?: string;
    price?: number;
  }>;
}

export interface IOrderStatusUpdatePayload {
  orderStatus?: OrderStatus | string;
  status?: OrderStatus | string;
  paymentStatus?: PaymentStatus | string;
}

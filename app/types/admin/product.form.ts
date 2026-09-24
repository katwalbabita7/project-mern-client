import { ProductSchema } from "@/schemas/admin/product.schema";
import * as yup from "yup";

export type ProductFormData = yup.InferType<typeof ProductSchema>;

export interface IProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  discountPrice?: number | null;
  discountPercent?: number | null;
  stock: number;
  sku?: string | null;
  brand: string;          // Brand ObjectId
  category: string;       // Category ObjectId
  image: {
    url: string;
    public_id?: string;
  };
  images?: {
    url: string;
    public_id?: string;
  }[] | null;
  tags?: string[] | null;
  isActive: boolean;
  new_arrival: boolean;
  is_feature: boolean;
  averageRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductResponse {
  success: boolean;
  message?: string;
  data?: IProduct;
}

export interface IProductListResponse {
  success: boolean;
  message?: string;
  data?: IProduct[];
}
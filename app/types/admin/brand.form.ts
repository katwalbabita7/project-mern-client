import * as yup from "yup";
import { BrandSchema } from "@/schemas/admin/brand.schema";

// Form data type
export type BrandFormData = yup.InferType<typeof BrandSchema>;

// API Response type
export interface IBrand {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: {
    path: string;
    publicId: string;
  } | null;
  logoUrl?: string | null;
  isActive?: boolean | string;
  createdAt: string;
  updatedAt: string;
}

export interface IBrandResponse {
  success: boolean;
  message?: string;
  data?: IBrand;
}

export interface IBrandListResponse {
  success: boolean;
  message?: string;
  data?: IBrand[];
}
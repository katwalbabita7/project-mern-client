import { CategoryFormData } from "@/schemas/admin/category.schema";

export type { CategoryFormData };

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: {
    path: string;
    publicId: string;
  } | null;
  parentCategory?: string | null; // ObjectId as string
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryResponse {
  success: boolean;
  message?: string;
  data?: ICategory;
}

export interface ICategoryListResponse {
  success: boolean;
  message?: string;
  data?: ICategory[];
}
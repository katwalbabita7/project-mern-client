//! login & register types/interface

import { ForgetPasswordSchema, LoginSchema, RegisterSchema } from '@/schemas/client/auth.schema';
import * as yup from 'yup';

// Derive types from schemas
export type ILoginFormData = yup.InferType<typeof LoginSchema>;
export type IForgetPasswordFormData = yup.InferType<typeof ForgetPasswordSchema>;
export type IRegisterFormData = yup.InferType<typeof RegisterSchema>;

// Common auth responses
export interface IAuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    full_name?: string;
    phone?: string;
  };
}

export interface IAuthError {
  message: string;
  field?: string;
}
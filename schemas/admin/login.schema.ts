import * as yup from "yup";

export const AdminLoginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Type inference from schema
export type AdminLoginFormData = yup.InferType<typeof AdminLoginSchema>;
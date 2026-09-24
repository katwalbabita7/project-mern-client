import * as yup from "yup";

export const BrandSchema = yup.object({
  name: yup
    .string()
    .required("Brand name is required")
    .min(2, "Minimum 2 characters")
    .max(100, "Maximum 100 characters")
    .trim(),

  description: yup
    .string()
    .max(500, "Maximum 500 characters")
    .trim()
    .nullable()
    .optional(),

  logo: yup
    .mixed()
    .nullable()
    .optional(),

  isActive: yup.mixed().oneOf([true, false, "true", "false"]),
});
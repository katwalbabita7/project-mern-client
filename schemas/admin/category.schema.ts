import * as yup from "yup";

export const CategorySchema = yup.object({
  name: yup
    .string()
    .required("Category name is required")
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name must be less than 100 characters"),

  description: yup
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .nullable(),

  parentCategory: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .optional(),

  isActive: yup
  .mixed()
  .oneOf([true, false, "true", "false"], "Invalid status")
  .required("Status is required")
  .transform((value) => value === true || value === "true") // → boolean
  .default(true),

  image: yup
    .mixed<File>()
    .nullable()
    .optional()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true; // optional (especially on edit)
      return value instanceof File && value.type.startsWith("image/");
    })
    .test("fileSize", "Image must be less than 5MB", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    }),
});

export type CategoryFormData = yup.InferType<typeof CategorySchema>;
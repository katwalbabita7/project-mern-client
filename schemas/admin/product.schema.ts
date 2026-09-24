import * as yup from "yup";

export const ProductSchema = yup.object({
  name: yup
    .string()
    .required("Product name is required")
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name cannot exceed 200 characters"),

  description: yup
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),

  discountPrice: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null || originalValue === undefined
        ? null
        : value
    )
    .typeError("Discount price must be a number")
    .min(0, "Discount price cannot be negative")
    .nullable()
    .optional()
    .test(
      "less-than-price",
      "Discount price must be less than original price",
      function (value) {
        const { price } = this.parent;
        if (value == null || value === undefined || isNaN(value)) return true;
        if (price == null || price === undefined || isNaN(price)) return true;
        return Number(value) < Number(price);
      }
    ),

  discountPercent: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null || originalValue === undefined
        ? null
        : value
    )
    .typeError("Discount percentage must be a number")
    .min(0, "Discount % cannot be negative")
    .max(99.99, "Discount % must be less than 100%")
    .nullable()
    .optional(),

  stock: yup
    .number()
    .typeError("Stock must be a number")
    .required("Stock quantity is required")
    .min(0, "Stock cannot be negative")
    .integer("Stock must be a whole number"),

  sku: yup
    .string()
    .trim()
    .uppercase()
    .optional(),

  brand: yup
    .string()
    .required("Brand is required"),

  category: yup
    .string()
    .required("Category is required"),

  image: yup
    .mixed()
    .nullable()
    .notRequired(),

  images: yup
    .array()
    .of(yup.mixed())
    .optional()
    .nullable(),

  tags: yup
    .string()
    .optional(),

  isActive: yup.mixed().oneOf([true, false, "true", "false"]),
});
import * as yup from "yup";

export const contactSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email address is required")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+ -]{7,15}$/, "Please enter a valid phone number"),
  subject: yup.string().required("Please select an inquiry topic"),
  orderNumber: yup.string().optional(),
  message: yup
    .string()
    .required("Message cannot be empty")
    .min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;
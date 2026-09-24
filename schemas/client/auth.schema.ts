import * as yup from 'yup';

// Login validation schema
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Email
export const ForgetPasswordSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});
// New Password
export const ResetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

// Register validation schema
export const RegisterSchema = yup.object().shape({
  full_name: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, "at least one number :[0-9] is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase, one lowercase, and one number'
    )
    .required('Password is required'),
  c_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .optional()
    .nullable(),
  profile_image: yup
    .mixed()
    .optional()
    .nullable(),
});

// Types derived from schemas
export type LoginFormData = yup.InferType<typeof LoginSchema>;
export type ForgetPasswordFormData = yup.InferType<typeof ForgetPasswordSchema>;
export type ResetPasswordFormData = yup.InferType<typeof ResetPasswordSchema>;
export type RegisterFormData = yup.InferType<typeof RegisterSchema>;
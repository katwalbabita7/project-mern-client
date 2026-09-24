"use client";

import { FieldError, UseFormRegister } from "react-hook-form";
import ErrorMessage from "./error-message";

type TextareaProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  register: UseFormRegister<any>;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
};

export default function Textarea({
  id,
  name,
  label,
  placeholder,
  required = false,
  rows = 4,
  register,
  error,
  disabled = false,
  className = "",
}: TextareaProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-label-md text-primary-500 mb-1.5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
        className={`w-full px-4 py-2.5 rounded-input border bg-white text-body-md text-primary-500
          placeholder:text-neutral-900/40 resize-none
          focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-neutral-300"}
        `}
      />

      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}
"use client";

import { FieldError, UseFormRegister } from "react-hook-form";
import ErrorMessage from "./error-message";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  id: string;
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
};

export default function Select({
  id,
  name,
  label,
  options,
  placeholder = "Select an option",
  required = false,
  register,
  error,
  disabled = false,
  className = "",
}: SelectProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-label-md text-primary-500 mb-1.5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        id={id}
        disabled={disabled}
        {...register(name)}
        className={`w-full px-4 py-2.5 rounded-input border bg-white text-body-md text-primary-500
          focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-neutral-300"}
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}
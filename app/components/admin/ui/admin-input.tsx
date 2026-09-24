"use client";

import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import ErrorMessage from "@/app/components/common/ui/error-message";

interface AdminInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<any>;
  error?: FieldError;
  disabled?: boolean;
  step?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number | string;
  max?: number | string;
}

export default function AdminInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  register,
  error,
  disabled = false,
  step,
  className = "",
  prefix,
  suffix,
  value,
  onChange,
  min,
  max,
}: AdminInputProps) {
  const registerProps = register ? register(name) : {};

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-neutral-800"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-xs text-neutral-500 font-medium pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          step={step}
          min={min}
          max={max}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          {...registerProps}
          {...(onChange ? { onChange } : {})}
          className={`w-full ${
            prefix ? "pl-9" : "px-3.5"
          } ${
            suffix ? "pr-9" : "px-3.5"
          } py-2.5 rounded-xl border text-sm text-neutral-800 placeholder:text-neutral-400
            bg-neutral-50/70 focus:bg-white transition-all
            focus:outline-none focus:ring-2 focus:ring-[#0058BE]/15 focus:border-[#0058BE]
            disabled:bg-neutral-100 disabled:cursor-not-allowed
            ${
              error
                ? "border-red-500 bg-red-50/20 focus:ring-red-500/20 focus:border-red-500"
                : "border-neutral-200"
            }
          `}
        />
        {suffix && (
          <span className="absolute right-3.5 text-xs text-neutral-500 font-medium pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {error && <ErrorMessage message={error.message as string} />}
    </div>
  );
}

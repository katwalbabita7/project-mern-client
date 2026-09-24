// import { register } from "module";
// import React from "react";
// import { FieldValues, Path, UseFormRegister, FieldError } from 'react-hook-form';
// import { LuAsterisk } from "react-icons/lu";

// interface IProps <T extends FieldValues> {
//     label: string;
//     id: string;
//     type?: 'text' | 'email' | 'password' | 'tel' | 'file';
//     placeholder?: string;
//     name: Path<T>;
//     required?: boolean;
//     register: UseFormRegister<T>;
//     error?: FieldError;  
//     className?: string;
// }

// function Input<T extends FieldValues> ({ 
//     label, 
//     id, 
//     placeholder, 
//     type = 'text', 
//     required = false,
//     name,
//     register,
//     error,  
//     className = '',
// }: IProps<T>) {
//     return (
//         <div className='flex flex-col gap-0.5 w-full'>
//             {/* label */}
//             <div className='flex items-center gap-0.5'>
//                 <label 
//                     htmlFor={id}
//                     className='text-xs font-semibold text-gray-700'
//                 >
//                     {label}
//                 </label>
//                 {required && <LuAsterisk size={12} className='text-red-500' />}
//             </div>
            
//             {/* input */}
//             <input
//                 {...register(name)}
//                 id={id}
//                 type={type}
//                 placeholder={placeholder}
//                 className={`w-full border border-gray-300 py-1.5 px-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-700 ${className}`}
//             />
            
//             {/* error message display */}
//             {error && (
//                 <p className='text-xs text-red-500 mt-0.5'>
//                     {error.message}
//                 </p>
//             )}
//         </div>
//     );
// }

// export default Input;

import React from "react";
import { FieldValues, Path, UseFormRegister, FieldError } from "react-hook-form";
import { LuAsterisk } from "react-icons/lu";
import ErrorMessage from "./error-message";

interface IProps<T extends FieldValues> {
  label: string;
  id: string;
  type?: "text" | "email" | "password" | "tel" | "number" | "file";
  placeholder?: string;
  name: Path<T>;
  required?: boolean;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
  disabled?: boolean;
}

function Input<T extends FieldValues>({
  label,
  id,
  placeholder,
  type = "text",
  required = false,
  name,
  register,
  error,
  className = "",
  disabled = false,
}: IProps<T>) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {/* Label */}
      <div className="flex items-center gap-0.5">
        <label
          htmlFor={id}
          className="text-label-md text-primary-500"
        >
          {label}
        </label>
        {required && <LuAsterisk size={12} className="text-red-500" />}
      </div>

      {/* Input */}
      <input
        {...register(name)}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2.5 rounded-input border bg-white text-body-md text-primary-500
          placeholder:text-neutral-900/40
          focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent
          transition disabled:bg-neutral-100 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-neutral-300"}
        `}
      />

      {/* Error */}
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}

export default Input;
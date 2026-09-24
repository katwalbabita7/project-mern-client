// interface IProps {
//   label: string;
//   type?: "submit" | "reset" | "button";
//   disabled?: boolean;
//   onClick?: () => void;
//   variant?: "primary" | "outline" | "danger";
//   className?: string;
// }

// const Button = ({
//   label,
//   type = "button",
//   disabled = false,
//   onClick,
//   variant = "primary",
//   className = "",
// }: IProps) => {
//   const baseClasses =
//     "px-5 py-2.5 rounded-button text-label-md font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

//   const variantClasses = {
//     primary:
//       "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
//     outline:
//       "border border-neutral-300 text-primary-500 bg-white hover:bg-neutral-100",
//     danger:
//       "bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700",
//   };

//   return (
//     <button
//       type={type}
//       disabled={disabled}
//       onClick={onClick}
//       className={`${baseClasses} ${variantClasses[variant]} ${className}`}
//     >
//       {label}
//     </button>
//   );
// };

// export default Button;

import React from "react";

interface IProps {
  label?: string;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger" | "tertiary";
  className?: string;
}

const Button = ({
  label,
  children,
  type = "button",
  disabled = false,
  onClick,
  variant = "secondary",
  className = "",
}: IProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium px-4 py-2 rounded-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-[#091426] hover:bg-[#1a202c] active:bg-[#03070f] text-white shadow-sm",
    secondary: "bg-[#0058BE] hover:bg-[#0047a0] active:bg-[#003680] text-white shadow-sm",
    tertiary: "bg-[#007472] hover:bg-[#0f766e] active:bg-[#115e59] text-white shadow-sm",
    outline: "border border-neutral-300 text-neutral-800 bg-white hover:bg-neutral-100",
    danger: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children || label}
    </button>
  );
};

export default Button;
import React from "react";
import { LuCircleAlert } from "react-icons/lu";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = "",
}) => {
  if (!message) return null;

  return (
    <p
      className={`text-xs text-red-500 font-medium mt-1 flex items-center gap-1.5 ${className}`}
      role="alert"
    >
      <LuCircleAlert className="w-3.5 h-3.5 shrink-0 text-red-500" />
      <span>{message}</span>
    </p>
  );
};

export default ErrorMessage;

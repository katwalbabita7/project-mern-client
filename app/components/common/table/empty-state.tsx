import React from "react";
import { FiInbox } from "react-icons/fi";

interface IProps {
  title?: string;
  description?: string;
  className?: string;
}

const EmptyState = ({
  title = "No data found",
  description = "There is nothing to show here yet.",
  className = "",
}: IProps) => {
  return (
    <div
      className={`w-full py-12 flex flex-col items-center justify-center text-center border rounded-md bg-gray-50 ${className}`}
    >
      <div className="text-gray-400 mb-3">
        <FiInbox size={40} />
      </div>
      <h3 className="text-base font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
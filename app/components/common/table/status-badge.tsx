import React from "react";

interface IProps {
  status: "active" | "inactive" | string;
  className?: string;
}

const StatusBadge = ({ status, className = "" }: IProps) => {
  const isActive = status?.toLowerCase() === "active";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      } ${className}`}
    >
      {status || "Unknown"}
    </span>
  );
};

export default StatusBadge;
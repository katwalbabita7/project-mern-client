import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface IProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  className?: string;
}

const TableActions = ({
  onView,
  onEdit,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
  className = "",
}: IProps) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {showView && onView && (
        <button
          type="button"
          onClick={onView}
          className="text-blue-600 hover:text-blue-800 transition"
          title="View Details"
        >
          <FaEye size={15} />
        </button>
      )}
      {showEdit && onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="text-amber-600 hover:text-amber-800 transition"
          title="Edit"
        >
          <FaEdit size={15} />
        </button>
      )}
      {showDelete && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 transition"
          title="Delete"
        >
          <FaTrash size={14} />
        </button>
      )}
    </div>
  );
};

export default TableActions;
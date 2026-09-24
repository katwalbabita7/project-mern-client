"use client";

import React from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

import TableActions from "../../common/table/table-actions";
import EmptyState from "../../common/table/empty-state";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../common/table/data-table";
import StatusBadge from "../../common/table/status-badge";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  image?: {
    path: string;
    publicId: string;
  } | null;
  parentCategory?: {
    _id: string;
    name: string;
  } | null;
  isActive?: boolean;
  createdAt?: string;
}

interface IProps {
  categories: ICategory[];
  loading?: boolean;
  onEdit?: (category: ICategory) => void;
  onDelete?: (id: string | number) => void;
  onView?: (category: ICategory) => void;
}

const CategoryTable = ({
  categories = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
}: IProps) => {
  if (loading) {
    return (
      <div className="w-full py-10 text-center text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        title="No categories found"
        description="Create a new category to see it listed here."
      />
    );
  }

  return (
    <DataTable>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Category Name</TableHead>
          <TableHead>Parent Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((category, index) => (
          <TableRow key={category._id}>
            {/* Serial */}
            <TableCell className="text-gray-600">{index + 1}</TableCell>

            {/* Image */}
            <TableCell>
              {category.image?.path ? (
                <img
                  src={category.image.path}
                  alt={category.name || "Category image"}
                  className="h-10 w-10 object-contain rounded border"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded border text-gray-400">
                  <MdOutlineImageNotSupported size={18} />
                </div>
              )}
            </TableCell>

            {/* Name */}
            <TableCell className="font-medium text-gray-800">
              {category.name}
            </TableCell>

            {/* Parent Category */}
            <TableCell className="text-gray-600">
              {category.parentCategory?.name || (
                <span className="text-gray-400">—</span>
              )}
            </TableCell>

            {/* Status */}
            <TableCell>
              <StatusBadge status={category.isActive ? "active" : "inactive"} />
            </TableCell>

            {/* Created At */}
            <TableCell className="text-gray-600">
              {category.createdAt
                ? new Date(category.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "-"}
            </TableCell>

            {/* Actions */}
            <TableCell>
              <TableActions
                onView={onView ? () => onView(category) : undefined}
                onEdit={onEdit ? () => onEdit(category) : undefined}
                onDelete={onDelete ? () => onDelete(category._id) : undefined}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  );
};

export default CategoryTable;
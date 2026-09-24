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

export interface IBrand {
  _id: string;
  name: string;
  logo?: {
    path: string;
    publicId: string;
  } | null;
  isActive?: boolean;
  createdAt?: string;
}

interface IProps {
  brands: IBrand[];
  loading?: boolean;
  onEdit?: (brand: IBrand) => void;
  onDelete?: (id: string | number) => void;
  onView?: (brand: IBrand) => void;
}

const BrandTable = ({
  brands = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
}: IProps) => {
  if (loading) {
    return (
      <div className="w-full py-10 text-center text-gray-500">
        Loading brands...
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <EmptyState
        title="No brands found"
        description="Create a new brand to see it listed here."
      />
    );
  }

  return (
    <DataTable>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Logo</TableHead>
          <TableHead>Brand Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {brands.map((brand, index) => (
          <TableRow key={brand._id}>
            {/* Serial */}
            <TableCell className="text-gray-600">{index + 1}</TableCell>

            {/* Logo */}
            <TableCell>
              {brand.logo?.path ? (
  <img
    src={brand.logo.path}
    alt={brand.name || "Brand logo"}
    className="h-10 w-10 object-contain rounded border"
    onError={(e) => {
      e.currentTarget.style.display = "none"; // broken image hide
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
              {brand.name}
            </TableCell>

            {/* Status */}
            <TableCell>
              <StatusBadge status={brand.isActive ? "active" : "inactive"} />
            </TableCell>

            {/* Created At */}
<TableCell className="text-gray-600">
  {brand.createdAt
    ? new Date(brand.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "-"}
</TableCell>

            {/* Actions */}
            <TableCell>
              <TableActions
                onView={onView ? () => onView(brand) : undefined}
                onEdit={onEdit ? () => onEdit(brand) : undefined}
                onDelete={onDelete ? () => onDelete(brand._id) : undefined}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  );
};

export default BrandTable;
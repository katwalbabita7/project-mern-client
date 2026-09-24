"use client";

import React from "react";
import Image from "next/image";
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

export interface IProductAdmin {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  stock: number;
  image?: { path: string; publicId?: string };
  images?: { path: string; publicId?: string }[];
  category?: { _id: string; name: string } | any;
  brand?: { _id: string; name: string } | any;
  isActive?: boolean;
  new_arrival?: boolean;
  is_feature?: boolean;
  createdAt?: string;
}

interface IProps {
  products: IProductAdmin[];
  loading?: boolean;
  onEdit?: (product: IProductAdmin) => void;
  onDelete?: (id: string | number) => void;
  onView?: (product: IProductAdmin) => void;
}

const ProductTable = ({
  products = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
}: IProps) => {
  if (loading) {
    return (
      <div className="w-full py-10 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Create a new product to see it listed here."
      />
    );
  }

  return (
    <DataTable>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category / Brand</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product, index) => {
          const imgUrl =
            product.image?.path ||
            (product.images && product.images[0]?.path);
          const categoryName =
            typeof product.category === "object" ? product.category?.name : "-";
          const brandName =
            typeof product.brand === "object" ? product.brand?.name : "-";

          return (
            <TableRow key={product._id}>
              {/* Serial */}
              <TableCell className="text-gray-600">{index + 1}</TableCell>

              {/* Thumbnail */}
              <TableCell>
                {imgUrl ? (
                  <div className="relative h-12 w-12 rounded border overflow-hidden bg-neutral-50">
                    <Image
                      src={imgUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded border text-gray-400">
                    <MdOutlineImageNotSupported size={18} />
                  </div>
                )}
              </TableCell>

              {/* Name & Badges */}
              <TableCell>
                <div className="font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </div>
                <div className="flex gap-1 mt-1">
                  {product.is_feature && (
                    <span className="text-label-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-medium">
                      Featured
                    </span>
                  )}
                  {product.new_arrival && (
                    <span className="text-label-xs bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-medium">
                      New
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Category / Brand */}
              <TableCell className="text-xs text-gray-600">
                <div>Cat: <span className="font-medium text-gray-800">{categoryName}</span></div>
                <div>Brand: <span className="font-medium text-gray-800">{brandName}</span></div>
              </TableCell>

              {/* Price */}
              <TableCell>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900">
                    Rs. {(product.discountPrice ?? product.price).toLocaleString()}
                  </span>
                  {product.discountPrice && product.discountPrice < product.price && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                      -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                    </span>
                  )}
                </div>
                {product.discountPrice && product.discountPrice < product.price && (
                  <div className="text-xs text-gray-400 line-through">
                    Rs. {product.price.toLocaleString()}
                  </div>
                )}
              </TableCell>

              {/* Stock */}
              <TableCell>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    product.stock > 0
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {product.stock} in stock
                </span>
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusBadge status={product.isActive ? "active" : "inactive"} />
              </TableCell>

              {/* Actions */}
              <TableCell>
                <TableActions
                  onView={onView ? () => onView(product) : undefined}
                  onEdit={onEdit ? () => onEdit(product) : undefined}
                  onDelete={onDelete ? () => onDelete(product._id) : undefined}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </DataTable>
  );
};

export default ProductTable;

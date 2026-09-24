"use client";

import React, { useState } from "react";
import { LuEye, LuBanknote, LuPhone } from "react-icons/lu";
import toast from "react-hot-toast";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/app/components/common/table/data-table";
import EmptyState from "@/app/components/common/table/empty-state";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/app/components/common/table/order-status-badge";
import { IOrder } from "@/app/types/order.types";
import { OrderStatus } from "@/app/types/enum.types";
import { updateOrderStatus } from "@/api/admin/order.api";

interface OrderTableProps {
  orders: IOrder[];
  loading?: boolean;
  onViewOrder: (order: IOrder) => void;
  onOrderUpdated: () => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders = [],
  loading = false,
  onViewOrder,
  onOrderUpdated,
}) => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="w-full py-12 text-center text-gray-500 font-medium">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders found"
        description="Orders placed by customers will appear here."
      />
    );
  }

  const handleInlineStatusChange = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, { orderStatus: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      onOrderUpdated();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <DataTable>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Order #</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order, index) => {
          const customerName =
            order.shippingAddress?.fullName ||
            (typeof order.user === "object"
              ? order.user?.full_name || order.user?.name
              : "") ||
            "Customer";

          const phone = order.shippingAddress?.phone;
          const isUpdating = updatingId === order._id;

          const dateStr = new Date(order.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <TableRow key={order._id}>
              {/* Serial */}
              <TableCell className="text-gray-500 font-medium">
                {index + 1}
              </TableCell>

              {/* Order Number */}
              <TableCell>
                <button
                  onClick={() => onViewOrder(order)}
                  className="font-mono font-bold text-xs text-[#0058BE] hover:underline cursor-pointer text-left"
                >
                  {order.orderNumber}
                </button>
              </TableCell>

              {/* Customer */}
              <TableCell>
                <div className="space-y-0.5">
                  <p className="font-semibold text-xs text-gray-900 line-clamp-1">
                    {customerName}
                  </p>
                  {phone && (
                    <p className="text-[11px] text-gray-500 flex items-center gap-1">
                      <LuPhone size={10} /> {phone}
                    </p>
                  )}
                </div>
              </TableCell>

              {/* Items */}
              <TableCell>
                <div className="text-xs text-gray-700">
                  <span className="font-semibold">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </span>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {order.items[0]?.name}
                    {order.items.length > 1 ? ` +${order.items.length - 1} more` : ""}
                  </p>
                </div>
              </TableCell>

              {/* Total */}
              <TableCell>
                <span className="font-bold text-xs text-[#091426]">
                  Rs. {order.totalAmount.toLocaleString()}
                </span>
              </TableCell>

              {/* Payment */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1 w-fit">
                    <LuBanknote size={12} /> COD
                  </span>
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>
              </TableCell>

              {/* Order Status with Inline Select */}
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <select
                    value={order.orderStatus}
                    disabled={isUpdating}
                    onChange={(e) =>
                      handleInlineStatusChange(order._id, e.target.value)
                    }
                    className="text-xs font-semibold px-2 py-1 border border-neutral-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0058BE] capitalize cursor-pointer disabled:opacity-50"
                  >
                    <option value={OrderStatus.PENDING}>Pending</option>
                    <option value={OrderStatus.PROCESSING}>Processing</option>
                    <option value={OrderStatus.SHIPPED}>Shipped</option>
                    <option value={OrderStatus.DELIVERED}>Delivered</option>
                    <option value={OrderStatus.CANCELLED}>Cancelled</option>
                  </select>
                  {isUpdating && (
                    <span className="text-[10px] text-[#0058BE] animate-spin">
                      ⏳
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Date */}
              <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                {dateStr}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-center">
                <button
                  onClick={() => onViewOrder(order)}
                  className="p-1.5 text-gray-500 hover:text-[#0058BE] hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                  title="View Order Details"
                >
                  <LuEye size={18} />
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </DataTable>
  );
};

export default OrderTable;

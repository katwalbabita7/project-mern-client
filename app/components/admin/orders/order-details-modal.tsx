"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  LuX,
  LuMapPin,
  LuPhone,
  LuUser,
  LuMail,
  LuBanknote,
  LuCalendar,
  LuPackage,
  LuCheck,
} from "react-icons/lu";
import toast from "react-hot-toast";
import { IOrder } from "@/app/types/order.types";
import { OrderStatus, PaymentStatus } from "@/app/types/enum.types";
import { updateOrderStatus } from "@/api/admin/order.api";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/app/components/common/table/order-status-badge";
import Button from "@/app/components/common/ui/button";

interface OrderDetailsModalProps {
  order: IOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdated: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onOrderUpdated,
}) => {
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (order) {
      setCurrentStatus(order.orderStatus);
      setCurrentPaymentStatus(order.paymentStatus);
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const handleStatusSave = async () => {
    try {
      setIsUpdating(true);
      await updateOrderStatus(order._id, {
        orderStatus: currentStatus,
        paymentStatus: currentPaymentStatus,
      });
      toast.success("Order status updated successfully!");
      onOrderUpdated();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  const customerName =
    order.shippingAddress?.fullName ||
    (typeof order.user === "object"
      ? order.user?.full_name || order.user?.name
      : "") ||
    "Customer";

  const customerEmail =
    typeof order.user === "object" ? order.user?.email : "";

  const orderDate = new Date(order.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-6">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-200 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-lg text-[#091426]">
                {order.orderNumber}
              </span>
              <OrderStatusBadge status={order.orderStatus} />
            </div>
            <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
              <LuCalendar size={13} /> Placed on {orderDate}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <LuX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Update Control Section */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
              Update Order & Payment Status
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Order Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE] capitalize font-medium"
                >
                  <option value={OrderStatus.PENDING}>Pending</option>
                  <option value={OrderStatus.PROCESSING}>Processing</option>
                  <option value={OrderStatus.SHIPPED}>Shipped</option>
                  <option value={OrderStatus.DELIVERED}>Delivered</option>
                  <option value={OrderStatus.CANCELLED}>Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Payment Status
                </label>
                <select
                  value={currentPaymentStatus}
                  onChange={(e) => setCurrentPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE] capitalize font-medium"
                >
                  <option value={PaymentStatus.PENDING}>Pending</option>
                  <option value={PaymentStatus.PAID}>Paid</option>
                  <option value={PaymentStatus.FAILED}>Failed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                variant="secondary"
                disabled={isUpdating}
                onClick={handleStatusSave}
                className="text-xs px-4 py-1.5"
              >
                {isUpdating ? "Saving..." : "Save Status Changes"}
              </Button>
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delivery Address */}
            <div className="border border-neutral-200 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <LuMapPin size={14} className="text-[#0058BE]" /> Shipping Address
              </span>
              <p className="font-semibold text-sm text-[#091426]">
                {order.shippingAddress?.fullName}
              </p>
              <p className="text-xs text-neutral-600">
                {order.shippingAddress?.address}
              </p>
              <p className="text-xs text-neutral-600">
                {order.shippingAddress?.city}
                {order.shippingAddress?.postalCode &&
                  `, ${order.shippingAddress.postalCode}`}
              </p>
              <p className="text-xs text-neutral-600 flex items-center gap-1 pt-1">
                <LuPhone size={12} /> {order.shippingAddress?.phone}
              </p>
            </div>

            {/* Customer Details & Payment */}
            <div className="border border-neutral-200 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <LuUser size={14} className="text-[#0058BE]" /> Customer & Payment
              </span>
              <p className="font-semibold text-sm text-[#091426]">
                {customerName}
              </p>
              {customerEmail && (
                <p className="text-xs text-neutral-600 flex items-center gap-1">
                  <LuMail size={12} /> {customerEmail}
                </p>
              )}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-xs text-neutral-500">Method:</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <LuBanknote size={13} /> Cash on Delivery
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Payment:</span>
                <PaymentStatusBadge status={order.paymentStatus} />
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
              <strong className="font-semibold">Customer Note:</strong> {order.notes}
            </div>
          )}

          {/* Ordered Products Table */}
          <div className="border border-neutral-200 rounded-xl overflow-hidden">
            <div className="bg-neutral-50 px-4 py-2.5 border-b border-neutral-200 font-bold text-xs uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
              <LuPackage size={14} /> Items ({order.items.length})
            </div>

            <div className="divide-y divide-neutral-100">
              {order.items.map((item, idx) => {
                const itemImg = item.image || "/placeholder-product.png";
                return (
                  <div
                    key={item._id || idx}
                    className="p-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                        <Image
                          src={itemImg}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#091426] line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          Rs. {item.price.toLocaleString()} × {item.quantity}
                          {item.variant ? ` • Variant: ${item.variant}` : ""}
                        </p>
                      </div>
                    </div>

                    <span className="font-semibold text-sm text-[#091426]">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600 text-xs">
              <span>Items Subtotal:</span>
              <span>Rs. {order.itemsPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-600 text-xs">
              <span>Shipping Fee:</span>
              <span>
                {order.shippingFee === 0 ? "Free" : `Rs. ${order.shippingFee}`}
              </span>
            </div>
            <div className="border-t border-neutral-200 pt-2 flex justify-between font-bold text-base text-[#091426]">
              <span>Total Amount:</span>
              <span className="text-[#0058BE]">
                Rs. {order.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex justify-end">
          <Button variant="outline" onClick={onClose} className="text-xs">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;

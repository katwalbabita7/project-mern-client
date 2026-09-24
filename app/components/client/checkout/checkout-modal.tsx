"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LuX,
  LuTruck,
  LuBanknote,
  LuMapPin,
  LuUser,
  LuPhone,
  LuCheck,
  LuPackageCheck,
} from "react-icons/lu";
import toast from "react-hot-toast";
import { createOrder } from "@/api/client/order.api";
import { IOrder } from "@/app/types/order.types";
import Button from "@/app/components/common/ui/button";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  itemCount: number;
  userName?: string;
  userPhone?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  subtotal,
  shippingFee,
  totalAmount,
  itemCount,
  userName = "",
  userPhone = "",
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [fullName, setFullName] = useState(userName);
  const [phone, setPhone] = useState(userPhone);
  const [city, setCity] = useState("Kathmandu");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [createdOrder, setCreatedOrder] = useState<IOrder | null>(null);

  const orderMutation = useMutation({
    mutationFn: () =>
      createOrder({
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          city: city.trim(),
          address: address.trim(),
        },
        paymentMethod: "COD",
        notes: notes.trim() || undefined,
      }),
    onSuccess: (res) => {
      const order = res.data;
      setCreatedOrder(order);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      toast.success("Order placed successfully with Cash on Delivery!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to place order. Please try again.");
    },
  });

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("Please enter recipient's full name");
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      toast.error("Please enter a valid contact phone number");
      return;
    }
    if (!city.trim()) {
      toast.error("Please enter delivery city");
      return;
    }
    if (!address.trim()) {
      toast.error("Please enter street address / delivery address");
      return;
    }

    orderMutation.mutate();
  };

  // Order Success Screen
  if (createdOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <LuCheck size={40} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              Order Confirmed!
            </h3>
            <p className="text-sm text-gray-600">
              Thank you for your purchase. Your order has been placed with{" "}
              <strong className="text-gray-900 font-semibold">
                Cash on Delivery (COD)
              </strong>
              .
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-4 text-left border border-neutral-200 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Number:</span>
              <span className="font-mono font-bold text-[#0058BE]">
                {createdOrder.orderNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-medium text-gray-900">
                Cash on Delivery (COD)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Order Status:</span>
              <span className="inline-block bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded text-xs uppercase">
                {createdOrder.orderStatus}
              </span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-2 font-bold text-base">
              <span>Total Amount:</span>
              <span className="text-[#0058BE]">
                Rs. {createdOrder.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                onClose();
                router.push("/profile");
              }}
              className="w-full sm:w-auto"
            >
              View My Orders
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onClose();
                router.push("/products");
              }}
              className="w-full sm:w-auto"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-6">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0058BE] flex items-center justify-center">
              <LuPackageCheck size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                Cash on Delivery Checkout
              </h2>
              <p className="text-xs text-gray-500">
                {itemCount} item{itemCount > 1 ? "s" : ""} in order
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={orderMutation.isPending}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <LuX size={20} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          {/* Cash on Delivery Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <LuBanknote size={22} />
            </div>
            <div className="text-sm">
              <h4 className="font-semibold text-emerald-900">
                Payment: Cash on Delivery (COD)
              </h4>
              <p className="text-emerald-700 text-xs mt-0.5">
                Pay safely in cash to the delivery rider when your package arrives at your doorstep. No prepayment required!
              </p>
            </div>
          </div>

          {/* Shipping Address Inputs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <LuMapPin size={16} className="text-[#0058BE]" /> Shipping Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Recipient Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058BE] focus:border-transparent"
                  />
                  <LuUser
                    size={16}
                    className="absolute left-3 top-2.5 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9801234567"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058BE] focus:border-transparent"
                  />
                  <LuPhone
                    size={16}
                    className="absolute left-3 top-2.5 text-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City / District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Kathmandu"
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058BE] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Delivery Address / Landmark <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. New Baneshwor, Near Chowk"
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058BE] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Special delivery instructions, timing preferences, etc."
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058BE] focus:border-transparent"
              />
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items Total ({itemCount})</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-1">
                <LuTruck size={15} /> Shipping Fee
              </span>
              <span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-semibold">FREE</span>
                ) : (
                  `Rs. ${shippingFee}`
                )}
              </span>
            </div>
            <div className="border-t border-neutral-200 pt-2 flex justify-between font-bold text-base text-gray-900">
              <span>Amount Due on Delivery:</span>
              <span className="text-xl text-[#0058BE]">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={orderMutation.isPending}
              className="px-4 py-2.5 rounded-lg border border-neutral-300 text-gray-700 font-medium text-sm hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={orderMutation.isPending}
              className="px-6 py-2.5 rounded-lg bg-[#0058BE] hover:bg-[#0047a0] text-white font-bold text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {orderMutation.isPending ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <LuCheck size={18} /> Confirm COD Order (Rs. {totalAmount.toLocaleString()})
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { LuSend } from "react-icons/lu";
import ErrorMessage from "@/app/components/common/ui/error-message";
import { contactSchema, ContactFormData } from "@/schemas/client/contact.schema";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        `Namaste ${data.fullName}, your message has been sent successfully! Our team will get back to you shortly.`
      );
      reset();
    } catch {
      toast.error("Failed to submit your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-7 space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#0058BE]">
          Drop Us A Message
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#091426] mt-1">
          Send a Query to Our Team
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Fill in the form below and we will get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="e.g. Ramesh Thapa"
              className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-neutral-800 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0058BE] transition ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300"
              }`}
            />
            {errors.fullName && (
              <ErrorMessage message={errors.fullName.message} />
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="e.g. ramesh@example.com"
              className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-neutral-800 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0058BE] transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300"
              }`}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="e.g. 98XXXXXXXX"
              className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-neutral-800 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0058BE] transition ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300"
              }`}
            />
            {errors.phone && <ErrorMessage message={errors.phone.message} />}
          </div>

          {/* Order ID */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700">
              Order Number{" "}
              <span className="text-neutral-400 text-label-sm font-normal">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              {...register("orderNumber")}
              placeholder="e.g. ORD-12345"
              className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 text-sm text-neutral-800 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0058BE] transition"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-700">
            Topic / Subject <span className="text-red-500">*</span>
          </label>
          <select
            {...register("subject")}
            className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE] transition ${
              errors.subject
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-300"
            }`}
          >
            <option value="">-- Select a subject --</option>
            <option value="Order Tracking & Status">
              Order Tracking & Status
            </option>
            <option value="Delivery & Shipping Issue">
              Delivery & Shipping Issue
            </option>
            <option value="Return, Exchange & Refund">
              Return, Exchange & Refund
            </option>
            <option value="Payment or Billing Inquiry">
              Payment or Billing Inquiry
            </option>
            <option value="Product Details & Availability">
              Product Details & Availability
            </option>
            <option value="Vendor & Business Inquiries">
              Vendor & Business Inquiries
            </option>
            <option value="Other">Other General Feedback</option>
          </select>
          {errors.subject && <ErrorMessage message={errors.subject.message} />}
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-700">
            Detailed Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            {...register("message")}
            placeholder="Explain how we can help you..."
            className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-neutral-800 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0058BE] transition resize-none ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-300"
            }`}
          />
          {errors.message && <ErrorMessage message={errors.message.message} />}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-[#0058BE] hover:bg-secondary-700 text-white font-semibold rounded-md shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <LuSend size={16} />
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
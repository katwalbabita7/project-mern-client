"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../common/ui/input";
import Button from "../../common/ui/button";
import {
  ForgetPasswordFormData,
  ForgetPasswordSchema,
  ResetPasswordFormData,
  ResetPasswordSchema,
} from "@/schemas/client/auth.schema";
import {
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "@/api/client/auth.api";

const ForgetPasswordForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Step 1 form
  const emailForm = useForm<ForgetPasswordFormData>({
    resolver: yupResolver(ForgetPasswordSchema),
    mode: "onBlur",
  });

  // Step 3 form
  const passwordForm = useForm<ResetPasswordFormData>({
    resolver: yupResolver(ResetPasswordSchema),
    mode: "onBlur",
  });

  // Step 1: Send OTP
  const sendOtpMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(response?.message ?? "OTP sent to your email");
      setEmail(emailForm.getValues("email"));
      setStep(2);
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to send OTP");
      emailForm.setError("root", {
        message: error?.message || "Failed to send OTP",
      });
    },
  });

  // Step 2: Verify OTP
  const verifyOtpMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (response) => {
      toast.success(response?.message ?? "OTP verified");
      setStep(3);
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Invalid or expired OTP");
    },
  });

  // Step 3: Reset Password
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response?.message ?? "Password reset successfully");
      setTimeout(() => router.push("/login"), 1500);
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to reset password");
      passwordForm.setError("root", {
        message: error?.message || "Failed to reset password",
      });
    },
  });

  const handleSendOTP = (data: ForgetPasswordFormData) => {
    sendOtpMutation.mutate({ email: data.email });
  };

  const handleVerifyOTP = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    verifyOtpMutation.mutate({ email, otp });
  };

  const handleResetPassword = (data: ResetPasswordFormData) => {
    resetPasswordMutation.mutate({
      email,
      otp,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/*  Email  */}
      {step === 1 && (
        <form
          onSubmit={emailForm.handleSubmit(handleSendOTP)}
          className="flex flex-col gap-4"
        >
            <p className="text-sm text-gray-500">
            Enter your email address and we'll send you an OTP to reset your password.
          </p>

          {emailForm.formState.errors.root && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md font-medium text-center">
              {emailForm.formState.errors.root.message}
            </div>
          )}

          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            register={emailForm.register}
            placeholder="Enter your email"
            required
            error={emailForm.formState.errors.email}
          />

          <div className="mt-2">
            <Button
              label={sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
              type="submit"
              disabled={sendOtpMutation.isPending}
            />
          </div>
        </form>
      )}

      {/* OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
          <p className="text-sm text-gray-600 text-center">
            Enter the 6-digit OTP sent to <strong>{email}</strong>
          </p>

          <div>
            <label className="text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 tracking-widest text-center text-lg"
            />
          </div>

          <div className="mt-2">
            <Button
              label={verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
              type="submit"
              disabled={verifyOtpMutation.isPending}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setStep(1);
              setOtp("");
            }}
            className="text-sm text-blue-500 hover:underline text-center"
          >
            Change Email
          </button>
        </form>
      )}

      {/* New Password */}
      {step === 3 && (
        <form
          onSubmit={passwordForm.handleSubmit(handleResetPassword)}
          className="flex flex-col gap-4"
        >
          <p className="text-sm text-gray-600 text-center">
            Enter your new password
          </p>

          {passwordForm.formState.errors.root && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md font-medium text-center">
              {passwordForm.formState.errors.root.message}
            </div>
          )}

          <Input
            label="New Password"
            id="newPassword"
            name="newPassword"
            type="password"
            register={passwordForm.register}
            placeholder="Enter new password"
            required
            error={passwordForm.formState.errors.newPassword}
          />

          <Input
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            register={passwordForm.register}
            placeholder="Confirm new password"
            required
            error={passwordForm.formState.errors.confirmPassword}
          />

          <div className="mt-2">
            <Button
              label={
                resetPasswordMutation.isPending
                  ? "Resetting..."
                  : "Reset Password"
              }
              type="submit"
              disabled={resetPasswordMutation.isPending}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgetPasswordForm;
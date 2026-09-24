"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePassword } from "@/api/client/auth.api";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const passwordMutation = useMutation({
    mutationFn: () =>
      changePassword({
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
      }),
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to change password");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (currentPassword.trim() === newPassword.trim()) {
    toast.error("New password cannot be the same as current password");
    return;
  }
        passwordMutation.mutate();
      }}
      className="space-y-4 max-w-md"
    >
      <h3 className="text-lg font-bold text-[#091426]">Update Password</h3>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Current Password</label>
        <input
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0058BE] bg-neutral-50"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">New Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password (min 6 characters)"
          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0058BE] bg-neutral-50"
        />
      </div>

      <button
        type="submit"
        disabled={passwordMutation.isPending}
        className="bg-[#0058BE] hover:bg-secondary-700 text-white font-semibold px-5 py-2 rounded-md text-sm transition-colors cursor-pointer"
      >
        {passwordMutation.isPending ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
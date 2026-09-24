"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeEmail } from "@/api/client/auth.api";
import { ChangeEmailFormProps } from "@/app/types/client/profile";

const ChangeEmailForm = ({ onSuccess }: ChangeEmailFormProps) => {
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  const emailMutation = useMutation({
    mutationFn: () =>
      changeEmail({
        newEmail: newEmail.trim(),
        password: emailPassword.trim(),
      }),
    onSuccess: () => {
      toast.success("Email changed successfully!");
      setNewEmail("");
      setEmailPassword("");
      onSuccess?.();
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to change email");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        emailMutation.mutate();
      }}
      className="space-y-4 max-w-md"
    >
      <h3 className="text-lg font-bold text-[#091426]">Update Email Address</h3>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">New Email Address</label>
        <input
          type="email"
          required
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email"
          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0058BE] bg-neutral-50"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Confirm Current Password</label>
        <input
          type="password"
          required
          value={emailPassword}
          onChange={(e) => setEmailPassword(e.target.value)}
          placeholder="Enter your current password"
          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0058BE] bg-neutral-50"
        />
      </div>

      <button
        type="submit"
        disabled={emailMutation.isPending}
        className="bg-[#0058BE] hover:bg-secondary-700 text-white font-semibold px-5 py-2 rounded-md text-sm transition-colors cursor-pointer"
      >
        {emailMutation.isPending ? "Updating..." : "Change Email"}
      </button>
    </form>
  );
};

export default ChangeEmailForm;
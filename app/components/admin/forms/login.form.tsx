"use client"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../common/ui/input";
import Button from "../../common/ui/button";

import { AdminLoginFormData, AdminLoginSchema } from "@/schemas/admin/login.schema";
import { adminLogin } from "@/api/admin/adminAuth.api";
import { Role } from "@/app/types/enum.types";
import { useAdminAuthStore } from "@/store/adminAuthStore";

const AdminLoginForm = () => {
  const router = useRouter();
  const setAuth = useAdminAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AdminLoginFormData>({
    resolver: yupResolver(AdminLoginSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: adminLogin,
    onSuccess: (response) => {
      const user = response?.data?.user ?? response?.user;
      const token = response?.data?.access_token ?? response?.access_token;
      const role = user?.role;

      if ((role === Role.ADMIN || role === Role.SUPER_ADMIN) && user && token) {
        // 1. Zustand store ma save
        setAuth(user, token);
        // 3. User side ko token clear (important)
        localStorage.removeItem("client_token");
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");

        // 2. Middleware ko lagi cookie set (yo important cha)
        document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

        toast.success(
          response?.message ?? response?.data?.message ?? "Login Successful!!"
        );

        router.replace("/admin/dashboard");
      } else {
        toast.error("You don't have admin access");
        setError("root", {
          message: "You don't have permission to access admin panel",
        });
      }
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Login failed!!");
      setError("root", {
        message: error?.message ?? "Login failed",
      });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      method="post"
      className="flex flex-col gap-4"
    >
      <p className="text-lg font-semibold">Admin Login</p>

      {errors.root && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
          <span>{errors.root.message}</span>
        </div>
      )}

      <Input
        id="email"
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email}
      />
      <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password}
      />

      <Button
        label={isPending ? "Logging in..." : "Login"}
        type="submit"
        disabled={isPending}
      />
    </form>
  );
};

export default AdminLoginForm;
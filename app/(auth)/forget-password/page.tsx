import Link from "next/link";
import ForgetPasswordForm from "@/app/components/client/forms/forget-password.form";
import React from "react";

const ForgetPasswordPage = () => {
  return (
    <main className="min-h-full flex justify-center items-center">
      <section className="min-h-80 w-90 border border-gray-300 rounded-md px-6 py-8">
        {/* heading */}
        <div className="mb-4 flex flex-col gap-1 text-center">
          <h1 className="font-semibold text-xl text-blue-500">
            Reset Password
          </h1>
        </div>

        {/* form */}
        <ForgetPasswordForm />

        <div className="flex flex-col gap-0.5 text-center mt-4">
          <p>
            Remember your password?
            <Link href={"/login"}>
              <span className="mx-1 text-blue-500 font-semibold">Login</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ForgetPasswordPage;
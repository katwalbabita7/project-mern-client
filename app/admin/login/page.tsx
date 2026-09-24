import AdminLoginForm from "@/app/components/admin/forms/login.form";

const AdminLoginPage = () => {
  return (
    <main className="min-h-full flex justify-center items-center">
      <section className="min-h-80 w-90 border border-gray-300 rounded-md px-6 py-8">
        {/* heading */}
        <div className="mb-4 flex flex-col gap-1 text-center">
          <h1 className="font-semibold text-xl text-blue-500">Admin Login</h1>
          <p className="font-sm text-gray-500">Welcome Back, Admin</p>
        </div>

        {/* form */}
        <AdminLoginForm />
      </section>
    </main>
  );
};

export default AdminLoginPage;
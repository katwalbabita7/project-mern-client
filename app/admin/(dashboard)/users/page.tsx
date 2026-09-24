"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuTrash2, LuUsers, LuShield } from "react-icons/lu";

import { confirmDeleteToast } from "@/app/components/common/ui/confirm-dialog";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/app/components/common/table/data-table";
import { deleteUser, getAllUsers } from "@/api/client/user.api";

interface IUser {
  _id: string;
  full_name?: string;
  email: string;
  phone?: string;
  role: string;
  createdAt?: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data.data || data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: string, name: string) => {
    confirmDeleteToast({
      message: `Are you sure you want to delete user "${name || id}"?`,
      onConfirm: async () => {
        try {
          await deleteUser(id);
          toast.success("User deleted successfully");
          fetchUsers();
        } catch (error: any) {
          toast.error(error?.message ?? "Failed to delete user");
        }
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage registered user accounts
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg border border-neutral-200 text-gray-500">
          No users registered yet.
        </div>
      ) : (
        <DataTable>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell className="text-gray-500">{index + 1}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-xs">
                      {user.full_name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="font-semibold text-gray-800">
                      {user.full_name || "Anonymous"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-600">{user.email}</TableCell>

                <TableCell className="text-gray-600">{user.phone || "-"}</TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                      user.role === "admin" || user.role === "super_admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {(user.role === "admin" || user.role === "super_admin") && (
                      <LuShield size={12} />
                    )}
                    {user.role}
                  </span>
                </TableCell>

                <TableCell className="text-gray-500 text-xs">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </TableCell>

                <TableCell className="text-center">
                  <button
                    onClick={() => handleDelete(user._id, user.full_name || user.email)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    title="Delete user"
                  >
                    <LuTrash2 size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
      )}
    </div>
  );
};

export default UsersPage;
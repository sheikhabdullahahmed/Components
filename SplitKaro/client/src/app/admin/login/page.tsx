import type { Metadata } from "next";
import { AdminLoginForm } from "@/features/admin/components/admin-login-form";

export const metadata: Metadata = { title: "Admin login · SplitKaro" };

export default function AdminLoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <AdminLoginForm />
    </div>
  );
}

import { OverviewCards } from "@/features/admin/components/overview-cards";
import { UsersTable } from "@/features/admin/components/admin-tables";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <OverviewCards />
      <section className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight">Users</h1>
        <UsersTable />
      </section>
    </div>
  );
}

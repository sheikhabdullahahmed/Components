import { GroupsTable } from "@/features/admin/components/admin-tables";

export default function AdminGroupsPage() {
  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold tracking-tight">Groups</h1>
      <GroupsTable />
    </section>
  );
}

import { InvitesTable } from "@/features/admin/components/admin-tables";

export default function AdminInvitesPage() {
  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold tracking-tight">Pending invites</h1>
      <p className="text-sm text-muted-foreground">
        Emails that were invited but have not signed up yet.
      </p>
      <InvitesTable />
    </section>
  );
}

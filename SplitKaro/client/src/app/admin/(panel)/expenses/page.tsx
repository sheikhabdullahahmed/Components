import { ExpensesTable } from "@/features/admin/components/admin-tables";

export default function AdminExpensesPage() {
  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold tracking-tight">Expenses</h1>
      <ExpensesTable />
    </section>
  );
}

"use client";

import { BanknoteIcon, Loader2Icon, ReceiptIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMe } from "@/features/auth/auth.hooks";
import { useDeleteSettlement, useSettlements } from "@/features/settlements/settlements.hooks";
import type { Settlement } from "@/features/settlements/settlements.types";
import { formatPKR } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useDeleteExpense, useExpenses } from "../expenses.hooks";
import type { Expense, ExpenseFilters } from "../expenses.types";

const dateFormat = new Intl.DateTimeFormat("en-PK", { month: "short", day: "numeric" });

export function ExpenseList({
  filters,
  emptyText = "No expenses yet.",
}: {
  filters?: ExpenseFilters;
  emptyText?: string;
}) {
  const expenses = useExpenses(filters);
  const settlements = useSettlements(filters);
  const deleteExpense = useDeleteExpense();
  const deleteSettlement = useDeleteSettlement();
  const { data: me } = useMe();

  if (expenses.isPending || settlements.isPending) {
    return (
      <div className="flex justify-center py-10">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Expenses and payments in one timeline, newest first.
  const items = [
    ...(expenses.data ?? []).map((data) => ({ kind: "expense" as const, data })),
    ...(settlements.data ?? []).map((data) => ({ kind: "settlement" as const, data })),
  ].sort(
    (a, b) =>
      b.data.date.localeCompare(a.data.date) || b.data.createdAt.localeCompare(a.data.createdAt),
  );

  if (items.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">{emptyText}</p>;
  }

  const nameOf = (person: { id: string; name: string | null; email: string }) =>
    person.id === me?.id ? "You" : (person.name ?? person.email);

  return (
    <ul className="divide-y">
      {items.map((item) =>
        item.kind === "settlement" ? (
          <SettlementRow
            key={item.data.id}
            settlement={item.data}
            nameOf={nameOf}
            deleting={deleteSettlement.isPending}
            onDelete={() =>
              window.confirm("Delete this payment?") && deleteSettlement.mutate(item.data.id)
            }
          />
        ) : (
          <ExpenseRow
            key={item.data.id}
            expense={item.data}
            meId={me?.id}
            nameOf={nameOf}
            deleting={deleteExpense.isPending}
            onDelete={() =>
              window.confirm(`Delete "${item.data.description}"?`) &&
              deleteExpense.mutate(item.data.id)
            }
          />
        ),
      )}
    </ul>
  );
}

type RowProps = {
  nameOf: (person: { id: string; name: string | null; email: string }) => string;
  deleting: boolean;
  onDelete: () => void;
};

function DeleteButton({ label, deleting, onDelete }: { label: string } & Omit<RowProps, "nameOf">) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      aria-label={label}
      disabled={deleting}
      onClick={onDelete}
    >
      <Trash2Icon />
    </Button>
  );
}

function DateCell({ date }: { date: string }) {
  return (
    <div className="w-12 shrink-0 text-center text-xs text-muted-foreground uppercase">
      {dateFormat.format(new Date(date))}
    </div>
  );
}

function SettlementRow({ settlement, nameOf, ...rest }: { settlement: Settlement } & RowProps) {
  return (
    <li className="group flex items-center gap-3 py-3">
      <DateCell date={settlement.date} />
      <BanknoteIcon className="hidden size-5 shrink-0 text-emerald-600 sm:block" />
      <div className="min-w-0 flex-1">
        <p className="truncate">
          {nameOf(settlement.payer)} paid {nameOf(settlement.payee)}{" "}
          <span className="font-medium">{formatPKR(settlement.amount)}</span>
        </p>
        {settlement.group && (
          <p className="truncate text-xs text-muted-foreground">{settlement.group.name}</p>
        )}
      </div>
      <DeleteButton label="Delete payment" {...rest} />
    </li>
  );
}

function ExpenseRow({
  expense,
  meId,
  nameOf,
  ...rest
}: { expense: Expense; meId?: string } & RowProps) {
  return (
        <li className="group flex items-center gap-3 py-3">
      <DateCell date={expense.date} />
      <ReceiptIcon className="hidden size-5 shrink-0 text-muted-foreground sm:block" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{expense.description}</p>
        <p className="truncate text-xs text-muted-foreground">
          {nameOf(expense.paidBy)} paid {formatPKR(expense.amount)}
          {expense.group && ` · ${expense.group.name}`}
        </p>
      </div>
      <YourShare expense={expense} meId={meId} />
      <DeleteButton label={`Delete ${expense.description}`} {...rest} />
    </li>
  );
}

// "you lent" = what others owe you for this expense; "you borrowed" = your share someone else paid.
function YourShare({ expense, meId }: { expense: Expense; meId?: string }) {
  const myShare = expense.splits.find((s) => s.user.id === meId)?.amount ?? 0;
  const paidByMe = expense.paidBy.id === meId;
  const value = paidByMe ? expense.amount - myShare : myShare;

  if (value === 0) {
    return <span className="shrink-0 text-xs text-muted-foreground">not involved</span>;
  }

  return (
    <div className={cn("shrink-0 text-right", paidByMe ? "text-emerald-600" : "text-orange-600")}>
      <p className="text-xs">{paidByMe ? "you lent" : "you borrowed"}</p>
      <p className="text-sm font-medium">{formatPKR(value)}</p>
    </div>
  );
}

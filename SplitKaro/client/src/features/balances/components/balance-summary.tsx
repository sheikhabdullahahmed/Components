"use client";

import { Loader2Icon } from "lucide-react";
import { formatPKR } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useBalances } from "../balances.hooks";
import type { Balances } from "../balances.types";
import { BalanceLabel } from "./balance-label";

// Three totals across the top of the dashboard.
export function BalanceSummary() {
  const balances = useBalances();
  const data = balances.data;

  return (
    <div className="grid grid-cols-3 divide-x border-b text-center">
      <Total
        label="Total balance"
        value={data?.net}
        tone={data && data.net !== 0 ? (data.net > 0 ? "owed" : "owe") : undefined}
        signed
      />
      <Total label="You owe" value={data?.totalOwe} tone={data?.totalOwe ? "owe" : undefined} />
      <Total
        label="You are owed"
        value={data?.totalOwed}
        tone={data?.totalOwed ? "owed" : undefined}
      />
    </div>
  );
}

function Total({
  label,
  value,
  tone,
  signed,
}: {
  label: string;
  value?: number;
  tone?: "owe" | "owed";
  signed?: boolean;
}) {
  return (
    <div className="px-2 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      {value === undefined ? (
        <Loader2Icon className="mx-auto mt-1 size-4 animate-spin text-muted-foreground" />
      ) : (
        <p
          className={cn(
            "mt-0.5 text-sm font-semibold sm:text-base",
            tone === "owe" && "text-orange-600",
            tone === "owed" && "text-emerald-600",
          )}
        >
          {signed && value > 0 ? "+ " : signed && value < 0 ? "- " : ""}
          {formatPKR(Math.abs(value))}
        </p>
      )}
    </div>
  );
}

// "You owe" and "You are owed" columns, one row per person.
export function BalanceColumns({ balances }: { balances: Balances }) {
  const owe = balances.people.filter((p) => p.amount < 0);
  const owed = balances.people.filter((p) => p.amount > 0);

  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-0 sm:divide-x">
      <Column title="You owe" people={owe} empty="You do not owe anything" />
      <Column title="You are owed" people={owed} empty="You are not owed anything" />
    </div>
  );
}

function Column({
  title,
  people,
  empty,
}: {
  title: string;
  people: Balances["people"];
  empty: string;
}) {
  return (
    <section className="sm:px-4 sm:first:pl-0 sm:last:pr-0">
      <h2 className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      {people.length === 0 ? (
        <p className="py-2 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {people.map(({ user, amount }) => (
            <li key={user.id} className="min-w-0">
              <p className="truncate font-medium">{user.name ?? user.email}</p>
              <BalanceLabel amount={amount} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

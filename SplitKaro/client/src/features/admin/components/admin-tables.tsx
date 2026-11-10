"use client";

import { PaperclipIcon } from "lucide-react";
import { useMe } from "@/features/auth/auth.hooks";
import { formatPKR } from "@/lib/money";
import type { AdminExpense, AdminGroup, AdminInvite, AdminUser } from "../admin.types";
import { type Column, ResourceTable } from "./resource-table";

const dateFormat = new Intl.DateTimeFormat("en-PK", {
  year: "numeric",
  month: "short",
  day: "numeric",
});
const formatDate = (iso: string) => dateFormat.format(new Date(iso));

function Person({ person }: { person: { name: string | null; email: string } }) {
  return (
    <div className="min-w-0">
      <p className="truncate">{person.name ?? person.email}</p>
      {person.name && <p className="truncate text-xs text-muted-foreground">{person.email}</p>}
    </div>
  );
}

export function UsersTable() {
  const { data: me } = useMe();

  const columns: Column<AdminUser>[] = [
    { header: "User", cell: (u) => <Person person={u} /> },
    { header: "Friends", cell: (u) => u.friends, className: "text-right" },
    { header: "Groups", cell: (u) => u.groups, className: "text-right" },
    { header: "Expenses paid", cell: (u) => u.expenses, className: "text-right" },
    { header: "Joined", cell: (u) => formatDate(u.createdAt) },
  ];

  return (
    <ResourceTable<AdminUser>
      resource="users"
      searchPlaceholder="Search by name or email"
      columns={columns}
      canDelete={(u) => u.id !== me?.id}
      confirmDelete={(u) => ({
        title: `Delete ${u.email}?`,
        description:
          "This also deletes their expenses, payments, friendships and the groups they created " +
          "(with those groups' expenses). It cannot be undone.",
      })}
      emptyText="No users found."
    />
  );
}

export function InvitesTable() {
  const columns: Column<AdminInvite>[] = [
    { header: "Invited email", cell: (i) => i.email },
    { header: "Invited by", cell: (i) => <Person person={i.invitedBy} /> },
    { header: "Sent", cell: (i) => formatDate(i.createdAt) },
  ];

  return (
    <ResourceTable<AdminInvite>
      resource="invites"
      searchPlaceholder="Search by invited email"
      columns={columns}
      confirmDelete={(i) => ({
        title: `Cancel the invite for ${i.email}?`,
        description: "If they sign up later they will not be connected to the person who invited them.",
      })}
      emptyText="No pending invites."
    />
  );
}

export function ExpensesTable() {
  const columns: Column<AdminExpense>[] = [
    {
      header: "Expense",
      cell: (e) => (
        <span className="flex items-center gap-1.5">
          <span className="truncate">{e.description}</span>
          {e.receiptUrl && <PaperclipIcon className="size-3.5 shrink-0 text-muted-foreground" />}
        </span>
      ),
    },
    { header: "Amount", cell: (e) => formatPKR(e.amount), className: "text-right" },
    { header: "Paid by", cell: (e) => <Person person={e.paidBy} /> },
    { header: "Group", cell: (e) => e.group?.name ?? "—" },
    { header: "Comments", cell: (e) => e._count.comments, className: "text-right" },
    { header: "Date", cell: (e) => formatDate(e.date) },
  ];

  return (
    <ResourceTable<AdminExpense>
      resource="expenses"
      searchPlaceholder="Search by description"
      columns={columns}
      confirmDelete={(e) => ({
        title: `Delete "${e.description}" (${formatPKR(e.amount)})?`,
        description: "Balances will change. It cannot be undone.",
      })}
      emptyText="No expenses found."
    />
  );
}

export function GroupsTable() {
  const columns: Column<AdminGroup>[] = [
    { header: "Group", cell: (g) => g.name },
    { header: "Created by", cell: (g) => <Person person={g.createdBy} /> },
    { header: "Members", cell: (g) => g._count.members, className: "text-right" },
    { header: "Expenses", cell: (g) => g._count.expenses, className: "text-right" },
    { header: "Created", cell: (g) => formatDate(g.createdAt) },
  ];

  return (
    <ResourceTable<AdminGroup>
      resource="groups"
      searchPlaceholder="Search by group name"
      columns={columns}
      confirmDelete={(g) => ({
        title: `Delete the group "${g.name}"?`,
        description: `Its ${g._count.expenses} expenses and payments are deleted too. It cannot be undone.`,
      })}
      emptyText="No groups found."
    />
  );
}

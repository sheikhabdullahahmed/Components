"use client";

import { useParams } from "next/navigation";
import { Loader2Icon, LogOutIcon, PencilIcon, Trash2Icon, UserPlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMe } from "@/features/auth/auth.hooks";
import { useBalances } from "@/features/balances/balances.hooks";
import { BalanceLabel } from "@/features/balances/components/balance-label";
import { AddExpenseDialog } from "@/features/expenses/components/add-expense-dialog";
import { ExpenseList } from "@/features/expenses/components/expense-list";
import { AddMemberDialog } from "@/features/groups/components/add-member-dialog";
import {
  useDeleteGroup,
  useGroup,
  useLeaveGroup,
  useRemoveGroupMember,
  useRenameGroup,
} from "@/features/groups/groups.hooks";

export default function GroupPage() {
  const { id } = useParams<{ id: string }>();
  const { data: me } = useMe();
  const group = useGroup(id);
  const groupBalances = useBalances(id);
  const balanceById = new Map(groupBalances.data?.people.map((p) => [p.user.id, p.amount]));

  const rename = useRenameGroup(id);
  const removeMember = useRemoveGroupMember(id);
  const leave = useLeaveGroup(id, me?.id ?? "");
  const deleteGroup = useDeleteGroup(id);

  if (group.isPending) {
    return (
      <div className="flex justify-center py-16">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!group.data) {
    return (
      <Card>
        <CardContent className="py-16 text-center text-muted-foreground">
          This group does not exist or you are not a member.
        </CardContent>
      </Card>
    );
  }

  const { data } = group;
  const isCreator = data.createdById === me?.id;

  function handleRename() {
    const name = window.prompt("New group name", data.name)?.trim();
    if (name && name !== data.name) rename.mutate(name);
  }

  return (
    <div className="space-y-6">
      <Card className="gap-0 py-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-1">
            <h1 className="truncate text-2xl font-semibold tracking-tight">{data.name}</h1>
            <Button variant="ghost" size="icon-sm" aria-label="Rename group" onClick={handleRename}>
              <PencilIcon />
            </Button>
          </div>
          <div className="flex gap-2">
            <AddExpenseDialog groupId={id} trigger={<Button>Add an expense</Button>} />
            {/* Wired up in the settle-up step. */}
            <Button variant="outline" disabled title="Coming soon">
              Settle up
            </Button>
          </div>
        </div>
        <CardContent className="px-4 sm:px-6">
          <ExpenseList filters={{ groupId: id }} emptyText="No expenses in this group yet." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Members ({data.members.length})</CardTitle>
          <AddMemberDialog
            group={data}
            trigger={
              <Button size="sm" variant="outline">
                <UserPlusIcon />
                Add people
              </Button>
            }
          />
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {data.members.map((member) => (
              <li key={member.id} className="flex items-center gap-3 py-2">
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {member.name ?? member.email}
                    {member.id === me?.id && " (you)"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                  {member.id !== me?.id && groupBalances.data && (
                    <BalanceLabel amount={balanceById.get(member.id) ?? 0} className="block" />
                  )}
                </div>
                {member.id === data.createdById && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Group admin
                  </span>
                )}
                {member.id !== me?.id && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="ml-auto"
                    aria-label={`Remove ${member.name ?? member.email}`}
                    disabled={removeMember.isPending}
                    onClick={() => {
                      if (window.confirm(`Remove ${member.name ?? member.email} from the group?`)) {
                        removeMember.mutate(member.id);
                      }
                    }}
                  >
                    <XIcon />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          disabled={leave.isPending}
          onClick={() => window.confirm("Leave this group?") && leave.mutate()}
        >
          <LogOutIcon />
          Leave group
        </Button>
        {isCreator && (
          <Button
            variant="destructive"
            disabled={deleteGroup.isPending}
            onClick={() =>
              window.confirm(`Delete "${data.name}" for everyone?`) && deleteGroup.mutate()
            }
          >
            <Trash2Icon />
            Delete group
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { Loader2Icon, UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBalances } from "@/features/balances/balances.hooks";
import { BalanceColumns, BalanceSummary } from "@/features/balances/components/balance-summary";
import { AddExpenseDialog } from "@/features/expenses/components/add-expense-dialog";
import { ExpenseList } from "@/features/expenses/components/expense-list";
import { AddFriendDialog } from "@/features/friends/components/add-friend-dialog";
import { useFriends } from "@/features/friends/friends.hooks";

export default function DashboardPage() {
  const friends = useFriends();
  const balances = useBalances();

  return (
    <Card className="gap-0 py-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-4 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          <AddExpenseDialog trigger={<Button>Add an expense</Button>} />
          {/* Wired up in the settle-up step. */}
          <Button variant="outline" disabled title="Coming soon">
            Settle up
          </Button>
        </div>
      </div>

      <BalanceSummary />

      <CardContent className="px-4 sm:px-6">
        {friends.isPending ? (
          <div className="flex justify-center py-16">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : friends.data?.length ? (
          <div className="space-y-6 py-6">
            {balances.data && <BalanceColumns balances={balances.data} />}
            <section>
              <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Recent expenses
              </h2>
              <ExpenseList emptyText='No expenses yet. Click "Add an expense" to get started.' />
            </section>
          </div>
        ) : (
          <div className="mx-auto max-w-md space-y-4 py-16 text-center">
            <h2 className="text-2xl font-semibold">Welcome to Peer to Peer Payment</h2>
            <p className="text-muted-foreground">Split bills with friends and keep track of who owes whom.</p>
            <p className="text-muted-foreground">Start by adding a friend.</p>
            <AddFriendDialog
              trigger={
                <Button size="lg">
                  <UserPlusIcon />
                  Add friends
                </Button>
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

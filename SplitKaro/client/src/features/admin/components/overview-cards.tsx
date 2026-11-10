"use client";

import { Loader2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatPKR } from "@/lib/money";
import { useAdminOverview } from "../admin.hooks";

export function OverviewCards() {
  const { data, isPending, isError } = useAdminOverview();

  if (isPending) {
    return <Loader2Icon className="size-5 animate-spin text-muted-foreground" />;
  }
  if (isError) return <p className="text-destructive">Could not load the overview.</p>;

  const stats = [
    { label: "Users", value: data.users },
    { label: "Groups", value: data.groups },
    { label: "Expenses", value: data.expenses },
    { label: "Total expense amount", value: formatPKR(data.totalAmount) },
  ];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardContent>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {data.settlements} payments recorded · {data.invites} pending invites
      </p>
    </div>
  );
}

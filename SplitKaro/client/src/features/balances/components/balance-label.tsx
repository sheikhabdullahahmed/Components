import { formatPKR } from "@/lib/money";
import { cn } from "@/lib/utils";

// Positive = they owe you, negative = you owe them.
export function BalanceLabel({ amount, className }: { amount: number; className?: string }) {
  if (amount === 0) {
    return <span className={cn("text-xs text-muted-foreground", className)}>settled up</span>;
  }
  const owesYou = amount > 0;
  return (
    <span
      className={cn("text-xs", owesYou ? "text-emerald-600" : "text-orange-600", className)}
    >
      {owesYou ? "owes you " : "you owe "}
      <span className="font-medium">{formatPKR(Math.abs(amount))}</span>
    </span>
  );
}

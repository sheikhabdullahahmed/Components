"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMe } from "@/features/auth/auth.hooks";
import { fieldErrors, formError } from "@/features/auth/components/form-errors";
import { useBalances } from "@/features/balances/balances.hooks";
import { BalanceLabel } from "@/features/balances/components/balance-label";
import { useFriends } from "@/features/friends/friends.hooks";
import { useGroup } from "@/features/groups/groups.hooks";
import { SELECT_CLASS, today } from "@/lib/form";
import { useCreateSettlement } from "../settlements.hooks";

type Direction = "you-paid" | "they-paid";

export function SettleUpDialog({
  groupId,
  trigger,
}: {
  groupId?: string;
  trigger: React.ReactElement;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settle up</DialogTitle>
          <DialogDescription>
            Record money that was paid back in cash or by bank transfer.
          </DialogDescription>
        </DialogHeader>
        <SettleUpForm groupId={groupId} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function SettleUpForm({ groupId, onDone }: { groupId?: string; onDone: () => void }) {
  const { data: me } = useMe();
  const friends = useFriends();
  const group = useGroup(groupId ?? "");
  const balances = useBalances(groupId);
  const settle = useCreateSettlement();

  const people = (groupId ? group.data?.members : friends.data)?.filter((p) => p.id !== me?.id) ?? [];
  const balanceOf = (id: string) =>
    balances.data?.people.find((p) => p.user.id === id)?.amount ?? 0;

  // User choices override the defaults derived from the current balance.
  const [chosenPerson, setChosenPerson] = useState<string | null>(null);
  const [chosenDirection, setChosenDirection] = useState<Direction | null>(null);
  const [chosenAmount, setChosenAmount] = useState<string | null>(null);

  // Default to the person with the biggest open balance (the API sorts by size).
  const biggestBalance = balances.data?.people.find((p) => people.some((x) => x.id === p.user.id));
  const personId = chosenPerson ?? biggestBalance?.user.id ?? people[0]?.id ?? "";
  const balance = balanceOf(personId);
  const direction = chosenDirection ?? (balance > 0 ? "they-paid" : "you-paid");
  const amount = chosenAmount ?? (balance ? (Math.abs(balance) / 100).toFixed(2) : "");

  function changePerson(id: string) {
    setChosenPerson(id);
    setChosenDirection(null);
    setChosenAmount(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!me) return;
    const form = new FormData(event.currentTarget);
    settle.mutate(
      {
        payerId: direction === "you-paid" ? me.id : personId,
        payeeId: direction === "you-paid" ? personId : me.id,
        amount: Number(amount),
        date: String(form.get("date")),
        groupId,
      },
      { onSuccess: onDone },
    );
  }

  if (friends.isPending || balances.isPending || (groupId && group.isPending)) {
    return <Loader2Icon className="mx-auto size-5 animate-spin text-muted-foreground" />;
  }

  if (people.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {groupId ? "There is nobody else in this group yet." : "Add a friend first."}
      </p>
    );
  }

  const amountErrors = fieldErrors(settle.error, "amount");
  const generalError = formError(settle.error, ["amount", "date"]);

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="settle-person">With</FieldLabel>
          <select
            id="settle-person"
            className={SELECT_CLASS}
            value={personId}
            onChange={(e) => changePerson(e.target.value)}
          >
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name ?? person.email}
              </option>
            ))}
          </select>
          <BalanceLabel amount={balance} />
        </Field>

        <Field>
          <FieldLabel htmlFor="settle-direction">Who paid?</FieldLabel>
          <select
            id="settle-direction"
            className={SELECT_CLASS}
            value={direction}
            onChange={(e) => setChosenDirection(e.target.value as Direction)}
          >
            <option value="you-paid">I paid them</option>
            <option value="they-paid">They paid me</option>
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field data-invalid={amountErrors.length > 0 || undefined}>
            <FieldLabel htmlFor="settle-amount">Amount (Rs)</FieldLabel>
            <Input
              id="settle-amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setChosenAmount(e.target.value)}
              required
            />
            <FieldError errors={amountErrors} />
          </Field>
          <Field>
            <FieldLabel htmlFor="settle-date">Date</FieldLabel>
            <Input id="settle-date" name="date" type="date" defaultValue={today()} required />
          </Field>
        </div>

        {generalError && <FieldError>{generalError}</FieldError>}

        <Button type="submit" className="w-full" disabled={settle.isPending || !personId}>
          {settle.isPending && <Loader2Icon className="animate-spin" />}
          Record payment
        </Button>
      </FieldGroup>
    </form>
  );
}

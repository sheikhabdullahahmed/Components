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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMe } from "@/features/auth/auth.hooks";
import { fieldErrors, formError } from "@/features/auth/components/form-errors";
import { useFriends } from "@/features/friends/friends.hooks";
import { useGroup, useGroups } from "@/features/groups/groups.hooks";
import { SELECT_CLASS, today } from "@/lib/form";
import { formatPKR, splitEqually } from "@/lib/money";
import { useCreateExpense } from "../expenses.hooks";

const FIELDS = ["description", "amount", "date", "paidById", "participantIds", "groupId"];

export function AddExpenseDialog({
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add an expense</DialogTitle>
          <DialogDescription>The amount is split equally between everyone ticked.</DialogDescription>
        </DialogHeader>
        {/* The popup unmounts when closed, so the form starts fresh each time. */}
        <AddExpenseForm initialGroupId={groupId ?? ""} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function AddExpenseForm({ initialGroupId, onDone }: { initialGroupId: string; onDone: () => void }) {
  const { data: me } = useMe();
  const friends = useFriends();
  const groups = useGroups();
  const createExpense = useCreateExpense();

  const [groupId, setGroupId] = useState(initialGroupId);
  const group = useGroup(groupId);
  const [amount, setAmount] = useState("");
  // null means "use the default for the chosen group" (everyone in a group, just you otherwise).
  const [picked, setPicked] = useState<Set<string> | null>(null);
  const [paidById, setPaidById] = useState(me?.id ?? "");

  const people = groupId
    ? (group.data?.members ?? [])
    : [...(me ? [me] : []), ...(friends.data ?? [])];
  const participants = picked ?? new Set(groupId ? people.map((p) => p.id) : me ? [me.id] : []);

  function changeGroup(next: string) {
    setGroupId(next);
    setPicked(null);
    setPaidById(me?.id ?? "");
  }

  function toggle(id: string) {
    const next = new Set(participants);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setPicked(next);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    createExpense.mutate(
      {
        description: String(form.get("description")).trim(),
        amount: Number(amount),
        date: String(form.get("date")),
        paidById,
        participantIds: [...participants],
        groupId: groupId || undefined,
      },
      { onSuccess: onDone },
    );
  }

  const totalPaisa = Math.round(Number(amount) * 100) || 0;
  const shares = participants.size ? splitEqually(totalPaisa, participants.size) : [];
  const generalError = formError(createExpense.error, FIELDS);
  const nameOf = (p: { id: string; name: string | null; email: string }) =>
    p.id === me?.id ? "You" : (p.name ?? p.email);

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field data-invalid={fieldErrors(createExpense.error, "description").length > 0 || undefined}>
          <FieldLabel htmlFor="expense-description">Description</FieldLabel>
          <Input
            id="expense-description"
            name="description"
            placeholder="Dinner at Monal"
            maxLength={200}
            required
          />
          <FieldError errors={fieldErrors(createExpense.error, "description")} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field data-invalid={fieldErrors(createExpense.error, "amount").length > 0 || undefined}>
            <FieldLabel htmlFor="expense-amount">Amount (Rs)</FieldLabel>
            <Input
              id="expense-amount"
              type="number"
              inputMode="decimal"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <FieldError errors={fieldErrors(createExpense.error, "amount")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="expense-date">Date</FieldLabel>
            <Input id="expense-date" name="date" type="date" defaultValue={today()} required />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="expense-group">Group</FieldLabel>
          <select
            id="expense-group"
            className={SELECT_CLASS}
            value={groupId}
            onChange={(e) => changeGroup(e.target.value)}
          >
            <option value="">No group (friends)</option>
            {groups.data?.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </Field>

        <FieldSet>
          <FieldLegend variant="label">Split equally between</FieldLegend>
          {groupId && group.isPending ? (
            <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
          ) : (
            <ul className="max-h-44 space-y-1 overflow-y-auto">
              {people.map((person) => {
                const checked = participants.has(person.id);
                const shareIndex = [...participants].indexOf(person.id);
                return (
                  <li key={person.id}>
                    <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(person.id)}
                        className="size-4 accent-primary"
                      />
                      <span className="truncate">{nameOf(person)}</span>
                      {checked && totalPaisa > 0 && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {formatPKR(shares[shareIndex])}
                        </span>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </FieldSet>

        <Field>
          <FieldLabel htmlFor="expense-paid-by">Paid by</FieldLabel>
          <select
            id="expense-paid-by"
            className={SELECT_CLASS}
            value={paidById}
            onChange={(e) => setPaidById(e.target.value)}
          >
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {nameOf(person)}
              </option>
            ))}
          </select>
        </Field>

        {generalError && <FieldError>{generalError}</FieldError>}

        <Button
          type="submit"
          className="w-full"
          disabled={createExpense.isPending || participants.size === 0}
        >
          {createExpense.isPending && <Loader2Icon className="animate-spin" />}
          Save expense
        </Button>
      </FieldGroup>
    </form>
  );
}

"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fieldErrors, formError } from "@/features/auth/components/form-errors";
import { useAddFriend } from "../friends.hooks";

// Shared by the sidebar "Invite friends" box and the add-friend dialog.
export function AddFriendForm({
  submitLabel = "Send invite",
  onAdded,
}: {
  submitLabel?: string;
  onAdded?: () => void;
}) {
  const addFriend = useAddFriend();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email")).trim();
    addFriend.mutate(email, {
      onSuccess: () => {
        form.reset();
        onAdded?.();
      },
    });
  }

  const generalError = formError(addFriend.error, ["email"]);
  const errors = [
    ...fieldErrors(addFriend.error, "email"),
    ...(generalError ? [{ message: generalError }] : []),
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Field data-invalid={errors.length > 0 || undefined}>
        <Input
          name="email"
          type="email"
          placeholder="friend@example.com"
          aria-label="Friend's email"
          required
          aria-invalid={errors.length > 0 || undefined}
        />
        <FieldError errors={errors} />
      </Field>
      <Button type="submit" className="w-full" disabled={addFriend.isPending}>
        {addFriend.isPending && <Loader2Icon className="animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}

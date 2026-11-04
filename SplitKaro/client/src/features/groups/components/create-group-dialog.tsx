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
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fieldErrors, formError } from "@/features/auth/components/form-errors";
import { useFriends } from "@/features/friends/friends.hooks";
import { useCreateGroup } from "../groups.hooks";

export function CreateGroupDialog({ trigger }: { trigger: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const friends = useFriends();
  const createGroup = useCreateGroup();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    createGroup.mutate(
      {
        name: String(form.get("name")).trim(),
        memberIds: form.getAll("memberIds").map(String),
      },
      { onSuccess: () => setOpen(false) },
    );
  }

  const nameErrors = fieldErrors(createGroup.error, "name");
  const generalError = formError(createGroup.error, ["name"]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) createGroup.reset();
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a group</DialogTitle>
          <DialogDescription>Group expenses for a trip, a flat or anything shared.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field data-invalid={nameErrors.length > 0 || undefined}>
              <FieldLabel htmlFor="group-name">Group name</FieldLabel>
              <Input
                id="group-name"
                name="name"
                placeholder="Trip to Murree"
                maxLength={100}
                required
                aria-invalid={nameErrors.length > 0 || undefined}
              />
              <FieldError errors={nameErrors} />
            </Field>

            <FieldSet>
              <FieldLegend variant="label">Members</FieldLegend>
              {friends.data?.length ? (
                <ul className="max-h-48 space-y-1 overflow-y-auto">
                  {friends.data.map((friend) => (
                    <li key={friend.id}>
                      <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted">
                        <input
                          type="checkbox"
                          name="memberIds"
                          value={friend.id}
                          className="size-4 accent-primary"
                        />
                        <span className="truncate">{friend.name ?? friend.email}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Add friends first. You can still create the group and add them later.
                </p>
              )}
            </FieldSet>

            {generalError && <FieldError>{generalError}</FieldError>}

            <Button type="submit" className="w-full" disabled={createGroup.isPending}>
              {createGroup.isPending && <Loader2Icon className="animate-spin" />}
              Create group
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

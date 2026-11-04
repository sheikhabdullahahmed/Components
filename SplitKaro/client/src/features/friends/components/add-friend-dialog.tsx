"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddFriendForm } from "./add-friend-form";

// `trigger` is the element that opens the dialog, e.g. a Button.
export function AddFriendDialog({ trigger }: { trigger: React.ReactElement }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a friend</DialogTitle>
          <DialogDescription>
            If they already have an account they are added right away. Otherwise they are added
            when they sign up with this email.
          </DialogDescription>
        </DialogHeader>
        <AddFriendForm submitLabel="Add friend" onAdded={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

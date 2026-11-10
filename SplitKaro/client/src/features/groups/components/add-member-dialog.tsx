"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFriends } from "@/features/friends/friends.hooks";
import { useAddGroupMember } from "../groups.hooks";
import type { Group } from "../groups.types";

export function AddMemberDialog({ group, trigger }: { group: Group; trigger: React.ReactElement }) {
  const friends = useFriends();
  const addMember = useAddGroupMember(group.id);

  const memberIds = new Set(group.members.map((m) => m.id));
  const candidates = friends.data?.filter((friend) => !memberIds.has(friend.id)) ?? [];

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add people to {group.name}</DialogTitle>
          <DialogDescription>You can add any of your friends.</DialogDescription>
        </DialogHeader>

        {candidates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            All your friends are already in this group. Add more friends from the sidebar.
          </p>
        ) : (
          <ul className="max-h-72 space-y-1 overflow-y-auto">
            {candidates.map((friend) => (
              <li key={friend.id} className="flex items-center gap-2 rounded-md px-2 py-1.5">
                <div className="min-w-0">
                  <p className="truncate">{friend.name ?? friend.email}</p>
                  {friend.name && (
                    <p className="truncate text-xs text-muted-foreground">{friend.email}</p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto"
                  disabled={addMember.isPending}
                  onClick={() => addMember.mutate(friend.id)}
                >
                  <PlusIcon />
                  Add
                </Button>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { MailIcon, PlusIcon, UserIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBalances } from "@/features/balances/balances.hooks";
import { BalanceLabel } from "@/features/balances/components/balance-label";
import { useCancelInvite, useFriendInvites, useFriends } from "../friends.hooks";
import { AddFriendDialog } from "./add-friend-dialog";

export function FriendsSidebarSection() {
  const friends = useFriends();
  const invites = useFriendInvites();
  const cancelInvite = useCancelInvite();
  const balances = useBalances();
  const balanceById = new Map(balances.data?.people.map((p) => [p.user.id, p.amount]));

  return (
    <section className="space-y-1">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Friends
        </h2>
        <AddFriendDialog
          trigger={
            <Button variant="ghost" size="icon-sm" aria-label="Add a friend">
              <PlusIcon />
            </Button>
          }
        />
      </div>

      {friends.data?.length === 0 && !invites.data?.length && (
        <p className="px-2 py-1 text-sm text-muted-foreground">No friends yet.</p>
      )}

      <ul>
        {friends.data?.map((friend) => (
          <li
            key={friend.id}
            className="flex items-start gap-2 rounded-md px-2 py-1.5 text-sm"
            title={friend.email}
          >
            <UserIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="truncate">{friend.name ?? friend.email}</p>
              {balanceById.has(friend.id) && (
                <BalanceLabel amount={balanceById.get(friend.id)!} className="block" />
              )}
            </div>
          </li>
        ))}

        {invites.data?.map((invite) => (
          <li
            key={invite.id}
            className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground"
          >
            <MailIcon className="size-4 shrink-0" />
            <span className="truncate" title={`Invited: ${invite.email}`}>
              {invite.email}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              className="ml-auto sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
              aria-label={`Cancel invite to ${invite.email}`}
              disabled={cancelInvite.isPending}
              onClick={() => cancelInvite.mutate(invite.id)}
            >
              <XIcon />
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}

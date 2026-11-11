"use client";

import { Popover } from "@base-ui/react/popover";
import { BellIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useMarkAllRead,
  useMarkRead,
  useNotifications,
  useUnreadCount,
} from "../notifications.hooks";
import type { AppNotification } from "../notifications.types";

function timeAgo(iso: string) {
  const seconds = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

export function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: unread = 0 } = useUnreadCount();
  const list = useNotifications(open);
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();

  // Toast when the count goes up between polls (not on the first load).
  const previous = useRef<number | null>(null);
  useEffect(() => {
    if (previous.current !== null && unread > previous.current) {
      toast.info("You have a new notification");
    }
    previous.current = unread;
  }, [unread]);

  const items = list.data?.pages.flatMap((page) => page.items) ?? [];

  function openNotification(n: AppNotification) {
    if (!n.readAt) markRead.mutate(n.id);
    setOpen(false);
    router.push(n.groupId ? `/groups/${n.groupId}` : "/dashboard");
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={<Button variant="ghost" size="icon" aria-label="Notifications" className="relative" />}
      >
        <BellIcon />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium leading-4 text-white">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="end" sideOffset={8}>
          <Popover.Popup className="z-50 w-80 rounded-lg border bg-popover text-popover-foreground shadow-md outline-none">
            <div className="flex items-center justify-between border-b px-3 py-2">
              <span className="text-sm font-medium">Notifications</span>
              <Button
                variant="ghost"
                size="sm"
                disabled={unread === 0 || markAllRead.isPending}
                onClick={() => markAllRead.mutate()}
              >
                Mark all read
              </Button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {list.isPending ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">Loading…</p>
              ) : items.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No notifications yet
                </p>
              ) : (
                <ul>
                  {items.map((n) => (
                    <li key={n.id}>
                      <button
                        type="button"
                        onClick={() => openNotification(n)}
                        className={cn(
                          "flex w-full flex-col gap-0.5 border-b px-3 py-2 text-left text-sm last:border-b-0 hover:bg-muted",
                          !n.readAt && "bg-muted/50 font-medium",
                        )}
                      >
                        <span>{n.message}</span>
                        <span className="text-xs font-normal text-muted-foreground">
                          {timeAgo(n.createdAt)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {list.hasNextPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  disabled={list.isFetchingNextPage}
                  onClick={() => list.fetchNextPage()}
                >
                  Load more
                </Button>
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

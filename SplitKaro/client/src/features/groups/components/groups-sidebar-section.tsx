"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGroups } from "../groups.hooks";
import { CreateGroupDialog } from "./create-group-dialog";

export function GroupsSidebarSection() {
  const groups = useGroups();
  const pathname = usePathname();

  return (
    <section className="space-y-1">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Groups
        </h2>
        <CreateGroupDialog
          trigger={
            <Button variant="ghost" size="icon-sm" aria-label="Create a group">
              <PlusIcon />
            </Button>
          }
        />
      </div>

      {groups.data?.length === 0 && (
        <p className="px-2 py-1 text-sm text-muted-foreground">No groups yet.</p>
      )}

      <ul>
        {groups.data?.map((group) => {
          const href = `/groups/${group.id}`;
          return (
            <li key={group.id}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                  pathname === href && "bg-muted font-medium",
                )}
              >
                <UsersIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{group.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {group._count.members}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

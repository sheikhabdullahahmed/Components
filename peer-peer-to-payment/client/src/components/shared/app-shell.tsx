"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRightIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogout } from "@/features/auth/auth.hooks";
import { RequireAuth } from "@/features/auth/components/auth-guards";
import { AddFriendForm } from "@/features/friends/components/add-friend-form";
import { FriendsSidebarSection } from "@/features/friends/components/friends-sidebar-section";
import { GroupsSidebarSection } from "@/features/groups/components/groups-sidebar-section";
import { cn } from "@/lib/utils";

const NAV = [{ href: "/", label: "Dashboard", icon: LayoutDashboardIcon }];

export function AppShell({ children }: { children: React.ReactNode }) {
  const logout = useLogout();
  const pathname = usePathname();

  return (
    <RequireAuth>
      {(user) => (
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b px-4 py-3 sm:px-8">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium">
              <ArrowLeftRightIcon className="size-4" />
              Peer to Peer Payment
            </Link>
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {user.name ?? user.email}
              </span>
              <Button variant="ghost" onClick={() => logout.mutate()} disabled={logout.isPending}>
                <LogOutIcon />
                Log out
              </Button>
            </div>
          </header>

          <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-6">
              <nav className="space-y-1">
                {NAV.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted",
                      pathname === href && "bg-muted",
                    )}
                  >
                    <Icon className="size-4" />
                    {label}
                  </Link>
                ))}
              </nav>

              <GroupsSidebarSection />

              <FriendsSidebarSection />

              <Card size="sm">
                <CardHeader>
                  <CardTitle>Invite friends</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddFriendForm />
                </CardContent>
              </Card>
            </aside>

            <main className="min-w-0">{children}</main>
          </div>
        </div>
      )}
    </RequireAuth>
  );
}

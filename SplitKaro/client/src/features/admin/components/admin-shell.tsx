"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Loader2Icon, LogOutIcon, ShieldIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLogout, useMe } from "@/features/auth/auth.hooks";
import { cn } from "@/lib/utils";
import { useAdminCheck } from "../admin.hooks";

const NAV = [
  { href: "/admin", label: "Users" },
  { href: "/admin/invites", label: "Invites" },
  { href: "/admin/expenses", label: "Expenses" },
  { href: "/admin/groups", label: "Groups" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <RequireAdminLogin>
      <AdminGate>
        <Frame>{children}</Frame>
      </AdminGate>
    </RequireAdminLogin>
  );
}

// Admins have their own login page, separate from the one regular users see.
function RequireAdminLogin({ children }: { children: React.ReactNode }) {
  const { data: user, isPending } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) router.replace("/admin/login");
  }, [isPending, user, router]);

  if (!user) return <Spinner />;
  return children;
}

function Spinner() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
}

// The server decides who is an admin; this only shows or hides the page.
function AdminGate({ children }: { children: React.ReactNode }) {
  const check = useAdminCheck();

  if (check.isPending) return <Spinner />;

  if (check.isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <ShieldIcon className="size-8 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Admins only</h1>
        <p className="text-muted-foreground">Your account does not have access to this area.</p>
        <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  return children;
}

function Frame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const logout = useLogout("/admin/login");

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-8">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ShieldIcon className="size-4" />
          SplitKaro Admin
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => logout.mutate()} disabled={logout.isPending}>
            <LogOutIcon />
            Log out
          </Button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6 sm:px-8">
        <nav className="flex gap-1 border-b">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "-mb-px border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground",
                pathname === href && "border-foreground text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

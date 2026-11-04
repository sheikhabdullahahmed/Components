"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useMe } from "../auth.hooks";
import type { AuthUser } from "../auth.types";

function FullPageSpinner() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
}

// Renders children only for a logged-in user; otherwise sends them to /login.
export function RequireAuth({ children }: { children: (user: AuthUser) => React.ReactNode }) {
  const { data: user, isPending } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) router.replace("/login");
  }, [isPending, user, router]);

  if (!user) return <FullPageSpinner />;
  return children(user);
}

// Login/signup pages: a user who is already logged in goes straight home.
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { data: user, isPending } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  if (isPending || user) return <FullPageSpinner />;
  return children;
}

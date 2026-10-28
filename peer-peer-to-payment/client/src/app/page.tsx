"use client";

import { ArrowLeftRightIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogout } from "@/features/auth/auth.hooks";
import { RequireAuth } from "@/features/auth/components/auth-guards";

export default function Home() {
  const logout = useLogout();

  return (
    <RequireAuth>
      {(user) => (
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b px-4 py-3 sm:px-8">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ArrowLeftRightIcon className="size-4" />
              Peer to Peer Payment
            </div>
            <Button variant="ghost" onClick={() => logout.mutate()} disabled={logout.isPending}>
              <LogOutIcon />
              Log out
            </Button>
          </header>

          <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hi, {user.name ?? user.email}</CardTitle>
                <CardDescription>You are logged in as {user.email}.</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Payments and transfers will show up here.
              </CardContent>
            </Card>
          </main>
        </div>
      )}
    </RequireAuth>
  );
}

import { ArrowLeftRightIcon } from "lucide-react";
import { GuestOnly } from "@/features/auth/components/auth-guards";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid flex-1 lg:grid-cols-[1.1fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ArrowLeftRightIcon className="size-4" />
          Peer to Peer Payment
        </div>

        <div className="max-w-md space-y-4">
          <p className="text-4xl leading-tight font-semibold tracking-tight">
            Split the bill. Pay a friend back. Done in seconds.
          </p>
          <p className="text-primary-foreground/70">
            Send and receive money directly with the people you know, without fees or waiting.
          </p>
        </div>

        <p className="text-xs text-primary-foreground/50">
          Secured with encrypted, httpOnly sessions.
        </p>
      </aside>

      <main className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <GuestOnly>{children}</GuestOnly>
        </div>
      </main>
    </div>
  );
}

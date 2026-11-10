import Link from "next/link";
import {
  ArrowLeftRightIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  HandCoinsIcon,
  ReceiptTextIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  UsersRoundIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: ReceiptTextIcon,
    title: "Split any expense",
    text: "Dinner, rent, a road trip. Add what you paid and split it with whoever was there.",
  },
  {
    icon: UsersRoundIcon,
    title: "Groups for every occasion",
    text: "Make a group for the flat or the trip, add members, and see everything in one place.",
  },
  {
    icon: ScaleIcon,
    title: "Always know who owes whom",
    text: "Live balances across friends and groups, so there are no awkward spreadsheets.",
  },
  {
    icon: HandCoinsIcon,
    title: "Settle up in one tap",
    text: "Paid a friend back in cash or by bank transfer? Record it and the balance clears.",
  },
  {
    icon: UserPlusIcon,
    title: "Invite by email",
    text: "Friend not on the app yet? Invite their email and they are connected when they join.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Private by default",
    text: "Encrypted httpOnly sessions, and amounts are stored as exact whole paisa, never floats.",
  },
];

const STEPS = [
  { title: "Add your friends", text: "Search by email or send an invite." },
  { title: "Add an expense", text: "Enter the amount and choose who shares it." },
  { title: "Settle up", text: "Pay back outside the app and record it in seconds." },
];

const SAMPLE = [
  { name: "Ayesha", note: "owes you", amount: "Rs 1,250", positive: true },
  { name: "Bilal", note: "owes you", amount: "Rs 800", positive: true },
  { name: "Hamza", note: "you owe", amount: "Rs 450", positive: false },
];

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <ArrowLeftRightIcon className="size-4" />
            SplitKaro
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#features"
              className="hidden px-3 text-sm text-muted-foreground hover:text-foreground sm:inline"
            >
              Features
            </a>
            <a
              href="#how"
              className="hidden px-3 text-sm text-muted-foreground hover:text-foreground sm:inline"
            >
              How it works
            </a>
            <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
              Log in
            </Link>
            <Link href="/signup" className={buttonVariants()}>
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              <CheckCircle2Icon className="size-3.5" />
              Free to use, no hidden fees
            </p>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
              Split the bill. Pay a friend back. Done in seconds.
            </h1>
            <p className="max-w-xl text-lg text-pretty text-muted-foreground">
              Keep track of shared expenses with friends, flatmates and travel groups, and always
              know exactly who owes whom.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Get started free
                <ArrowRightIcon />
              </Link>
              <Link href="/login" className={buttonVariants({ size: "lg", variant: "outline" })}>
                I already have an account
              </Link>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative">
            <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Dashboard</p>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  Weekend trip
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border p-3">
                  <p className="text-xs text-muted-foreground">You are owed</p>
                  <p className="mt-1 text-xl font-semibold text-emerald-600 tabular-nums">
                    Rs 2,050
                  </p>
                </div>
                <div className="rounded-xl border p-3">
                  <p className="text-xs text-muted-foreground">You owe</p>
                  <p className="mt-1 text-xl font-semibold text-red-600 tabular-nums">Rs 450</p>
                </div>
              </div>

              <ul className="mt-5 divide-y">
                {SAMPLE.map((row) => (
                  <li key={row.name} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {row.name[0]}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{row.name}</p>
                        <p className="text-xs text-muted-foreground">{row.note}</p>
                      </div>
                    </div>
                    <p
                      className={cn(
                        "text-sm font-semibold tabular-nums",
                        row.positive ? "text-emerald-600" : "text-red-600",
                      )}
                    >
                      {row.amount}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-2 rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground">
                Settle up
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-14 border-t bg-muted/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 lg:py-24">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight">
                Everything you need to share costs
              </h2>
              <p className="text-muted-foreground">
                No more &ldquo;I will pay you later&rdquo; and forgetting. Every rupee is tracked.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-4 font-medium">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto w-full max-w-6xl scroll-mt-14 px-4 py-16 sm:px-8 lg:py-24">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="space-y-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="pt-2 font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-8 lg:pb-24">
          <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Ready to stop chasing people for money?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-primary-foreground/70">
              Create a free account and add your first expense in under a minute.
            </p>
            <Link
              href="/signup"
              className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "mt-8")}
            >
              Create free account
              <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <p className="flex items-center gap-2">
            <ArrowLeftRightIcon className="size-4" />
            SplitKaro
          </p>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

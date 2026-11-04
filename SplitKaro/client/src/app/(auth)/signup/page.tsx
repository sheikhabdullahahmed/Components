import type { Metadata } from "next";
import { GoogleButton } from "@/features/auth/components/google-button";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = { title: "Sign up · SplitKaro" };

export default function SignupPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">It takes less than a minute.</p>
      </div>
      <GoogleButton />
      <SignupForm />
    </div>
  );
}

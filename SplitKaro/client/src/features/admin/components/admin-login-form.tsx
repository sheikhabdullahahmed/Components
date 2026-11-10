"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon, ShieldIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMe } from "@/features/auth/auth.hooks";
import { fieldErrors, formError } from "@/features/auth/components/form-errors";
import { PasswordInput } from "@/features/auth/components/password-input";
import { useAdminCheck, useAdminLogin } from "../admin.hooks";

const FIELDS = ["email", "password"];

export function AdminLoginForm() {
  const login = useAdminLogin();
  const router = useRouter();
  const { data: user } = useMe();
  const admin = useAdminCheck();

  // Someone who is already logged in as an admin doesn't need to log in again.
  useEffect(() => {
    if (user && admin.isSuccess) router.replace("/admin");
  }, [user, admin.isSuccess, router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    login.mutate({
      email: String(form.get("email")).trim(),
      password: String(form.get("password")),
    });
  }

  const emailErrors = fieldErrors(login.error, "email");
  const passwordErrors = fieldErrors(login.error, "password");
  const generalError = formError(login.error, FIELDS);

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="space-y-2">
        <ShieldIcon className="size-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Admin login</h1>
        <p className="text-sm text-muted-foreground">Only for SplitKaro administrators.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field data-invalid={emailErrors.length > 0 || undefined}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={emailErrors.length > 0 || undefined}
            />
            <FieldError errors={emailErrors} />
          </Field>

          <Field data-invalid={passwordErrors.length > 0 || undefined}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              required
              aria-invalid={passwordErrors.length > 0 || undefined}
            />
            <FieldError errors={passwordErrors} />
          </Field>

          {generalError && <FieldError>{generalError}</FieldError>}

          <Button type="submit" size="lg" className="w-full" disabled={login.isPending}>
            {login.isPending && <Loader2Icon className="animate-spin" />}
            Log in as admin
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

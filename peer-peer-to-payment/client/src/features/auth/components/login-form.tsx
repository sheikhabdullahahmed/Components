"use client";

import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "../auth.hooks";
import { PasswordInput } from "./password-input";
import { fieldErrors, formError } from "./form-errors";

const FIELDS = ["email", "password"];

export function LoginForm() {
  const login = useLogin();

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
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field data-invalid={emailErrors.length > 0 || undefined}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
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
          Log in
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link href="/signup" className="font-medium text-foreground underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}

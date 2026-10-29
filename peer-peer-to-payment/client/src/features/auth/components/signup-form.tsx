"use client";

import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignup } from "../auth.hooks";
import { PasswordInput } from "./password-input";
import { fieldErrors, formError } from "./form-errors";

const FIELDS = ["name", "email", "password"];

export function SignupForm() {
  const signup = useSignup();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    signup.mutate({
      name: String(form.get("name")).trim(),
      email: String(form.get("email")).trim(),
      password: String(form.get("password")),
    });
  }

  const errors = {
    name: fieldErrors(signup.error, "name"),
    email: fieldErrors(signup.error, "email"),
    password: fieldErrors(signup.error, "password"),
  };
  const generalError = formError(signup.error, FIELDS);

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field data-invalid={errors.name.length > 0 || undefined}>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Ayesha Khan"
            required
            minLength={2}
            maxLength={100}
            aria-invalid={errors.name.length > 0 || undefined}
          />
          <FieldError errors={errors.name} />
        </Field>

        <Field data-invalid={errors.email.length > 0 || undefined}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            aria-invalid={errors.email.length > 0 || undefined}
          />
          <FieldError errors={errors.email} />
        </Field>

        <Field data-invalid={errors.password.length > 0 || undefined}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={72}
            aria-invalid={errors.password.length > 0 || undefined}
          />
          {errors.password.length > 0 ? (
            <FieldError errors={errors.password} />
          ) : (
            <FieldDescription>At least 8 characters.</FieldDescription>
          )}
        </Field>

        {generalError && <FieldError>{generalError}</FieldError>}

        <Button type="submit" size="lg" className="w-full" disabled={signup.isPending}>
          {signup.isPending && <Loader2Icon className="animate-spin" />}
          Create account
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
            Log in
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}

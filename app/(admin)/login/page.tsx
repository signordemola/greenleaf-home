"use client";

import { useState, useTransition } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      setError("");
      const result = await loginAction({ email, password });
      if (result && !result.ok) setError(result.error);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linen/30 px-4">
      <div className="w-full max-w-sm rounded-sm border border-border bg-background p-8 shadow-sm">
        <Logo />
        <h1 className="mt-8 font-display text-3xl leading-tight">
          Owner login
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to run your day.
        </p>

        {error && (
          <p className="mt-5 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-sm"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-sm"
            />
          </Field>
          <Button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-forest text-white hover:opacity-90"
          >
            {pending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

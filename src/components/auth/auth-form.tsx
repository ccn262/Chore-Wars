"use client";

import type { Route } from "next";
import { useActionState } from "react";
import type { FormState } from "@/lib/form-state";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type AuthFormProps = {
  title: string;
  description: string;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
  alternateHref: Route;
  alternateLabel: string;
  showDisplayName?: boolean;
};

export function AuthForm({
  title,
  description,
  action,
  submitLabel,
  alternateHref,
  alternateLabel,
  showDisplayName = false,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <Card className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>

      {state.message ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            state.status === "error"
              ? "bg-red-500/10 text-red-700"
              : "bg-emerald-500/10 text-emerald-700"
          }`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <form action={formAction} className="space-y-4">
        {showDisplayName ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">
              Display name
            </span>
            <Input
              name="displayName"
              placeholder="Alex"
              autoComplete="nickname"
              maxLength={80}
            />
          </label>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Email</span>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Password</span>
          <Input
            name="password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete={showDisplayName ? "new-password" : "current-password"}
            minLength={8}
            required
          />
        </label>

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Please wait..." : submitLabel}
          </Button>
          <Button href={alternateHref} variant="secondary" className="w-full">
            {alternateLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}

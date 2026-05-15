"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/form-state";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type HouseholdFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

export function HouseholdForm({ action }: HouseholdFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <Card className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Setup
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Give your household a name. The first member will be created as the
          owner automatically.
        </p>
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
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Household name</span>
          <Input
            name="householdName"
            placeholder="The Example Flat"
            autoComplete="organization"
            maxLength={120}
            required
          />
        </label>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating..." : "Create household"}
        </Button>
      </form>
    </Card>
  );
}

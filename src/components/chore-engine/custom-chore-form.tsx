"use client";

import { useActionState } from "react";

import { createCustomChoreAction } from "@/app/chores/actions";
import type { FormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const initialState: FormState = {
  status: "idle",
  message: "",
};

export function CustomChoreForm() {
  const [state, formAction, pending] = useActionState(
    createCustomChoreAction,
    initialState,
  );

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Custom chore
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Add a quick household chore without leaving the page.
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
          <span className="text-sm font-medium text-foreground">Name</span>
          <Input
            name="title"
            placeholder="Take out the rubbish"
            maxLength={120}
            required
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Points</span>
            <Input
              name="points"
              type="number"
              min={1}
              max={20}
              defaultValue={2}
              inputMode="numeric"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Cadence</span>
            <Select name="cadence" defaultValue="weekly">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="flexible">Flexible</option>
            </Select>
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Adding..." : "Add chore"}
        </Button>
      </form>
    </Card>
  );
}

"use client";

import { useActionState } from "react";

import { completeChoreAction } from "@/app/chores/actions";
import type { FormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type ChoreCompleteButtonProps = {
  choreId: string;
  points: number;
  label?: string;
  compact?: boolean;
};

export function ChoreCompleteButton({
  choreId,
  points,
  label = "Done",
  compact = false,
}: ChoreCompleteButtonProps) {
  const [state, formAction, pending] = useActionState(
    completeChoreAction,
    initialState,
  );
  const isSuccess = state.status === "success";
  const messageClasses = isSuccess
    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-800"
    : "border-red-500/20 bg-red-500/10 text-red-800";

  return (
    <div className="space-y-2">
      <form action={formAction}>
        <input type="hidden" name="choreId" value={choreId} />
        <Button
          type="submit"
          className={`w-full ${compact ? "text-xs" : ""}`}
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Saving..." : `${label} · +${points}`}
        </Button>
      </form>
      {state.message ? (
        <p
          className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${messageClasses}`}
          aria-live="polite"
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

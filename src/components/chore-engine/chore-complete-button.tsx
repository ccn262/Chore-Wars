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

  return (
    <div className="space-y-2">
      <form action={formAction}>
        <input type="hidden" name="choreId" value={choreId} />
        <Button
          type="submit"
          className={compact ? "w-full text-xs" : "w-full"}
          disabled={pending}
        >
          {pending ? "Tapping..." : `${label} · +${points}`}
        </Button>
      </form>
      {state.message ? (
        <p
          className={`text-xs leading-5 ${
            state.status === "error" ? "text-red-700" : "text-emerald-700"
          }`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useActionState } from "react";

import { createChoreFromTemplateAction } from "@/app/chores/actions";
import type { FormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type TemplateCreateButtonProps = {
  templateId: string;
  label?: string;
};

export function TemplateCreateButton({
  templateId,
  label = "Add this chore",
}: TemplateCreateButtonProps) {
  const [state, formAction, pending] = useActionState(
    createChoreFromTemplateAction,
    initialState,
  );
  const isSuccess = state.status === "success";
  const messageClasses = isSuccess
    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-800"
    : "border-red-500/20 bg-red-500/10 text-red-800";

  return (
    <div className="space-y-2">
      <form action={formAction}>
        <input type="hidden" name="templateId" value={templateId} />
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Adding..." : label}
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

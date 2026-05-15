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

  return (
    <div className="space-y-2">
      <form action={formAction}>
        <input type="hidden" name="templateId" value={templateId} />
        <Button type="submit" variant="secondary" className="w-full" disabled={pending}>
          {pending ? "Adding..." : label}
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

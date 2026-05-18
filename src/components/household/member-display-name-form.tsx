"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { updateHouseholdMemberDisplayNameAction } from "@/app/(app)/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormState } from "@/lib/form-state";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type MemberDisplayNameFormProps = {
  memberId: string;
  displayName: string;
};

export function MemberDisplayNameForm({
  memberId,
  displayName,
}: MemberDisplayNameFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    updateHouseholdMemberDisplayNameAction,
    initialState,
  );
  const lastSuccessKey = useRef<string | null>(null);

  useEffect(() => {
    if (pending) {
      lastSuccessKey.current = null;
      return;
    }

    if (state.status === "success" && state.message) {
      const key = `success:${state.message}`;
      if (lastSuccessKey.current !== key) {
        lastSuccessKey.current = key;
        router.refresh();
      }
      return;
    }

    if (state.status !== "success") {
      lastSuccessKey.current = null;
    }
  }, [pending, router, state.message, state.status]);

  return (
    <div className="space-y-3 rounded-2xl bg-muted/40 p-3">
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="memberId" value={memberId} />
        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Display name / nickname
          </span>
          <Input
            name="displayName"
            defaultValue={displayName}
            autoComplete="nickname"
            maxLength={80}
          />
        </label>

        {state.message ? (
          <p
            className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
              state.status === "error"
                ? "border border-red-500/20 bg-red-500/10 text-red-800"
                : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-800"
            }`}
            aria-live="polite"
            role="status"
          >
            {state.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Saving..." : "Save name"}
        </Button>
      </form>
    </div>
  );
}

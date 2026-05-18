"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { revokeHouseholdInviteAction } from "@/app/invite/actions";
import { Button } from "@/components/ui/button";
import type { FormState } from "@/lib/form-state";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type PendingInviteCancelButtonProps = {
  token: string;
  label?: string;
};

export function PendingInviteCancelButton({
  token,
  label = "Cancel invite",
}: PendingInviteCancelButtonProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    revokeHouseholdInviteAction,
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
    <div className="space-y-2">
      <form action={formAction}>
        <input type="hidden" name="token" value={token} />
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          disabled={pending}
        >
          {pending ? "Cancelling..." : label}
        </Button>
      </form>

      {state.message ? (
        <p
          className={`rounded-2xl px-3 py-2 text-xs leading-5 ${
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
    </div>
  );
}

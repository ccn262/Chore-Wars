"use client";

import { useActionState } from "react";

import { acceptHouseholdInviteAction } from "@/app/invite/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { FormState } from "@/lib/form-state";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type InviteJoinCardProps = {
  token: string;
  inviteEmail: string;
};

export function InviteJoinCard({ token, inviteEmail }: InviteJoinCardProps) {
  const [state, formAction, pending] = useActionState(
    acceptHouseholdInviteAction,
    initialState,
  );

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Join household
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          You’re invited to join {inviteEmail}. Tap once to accept and jump into the household.
        </p>
      </div>

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

      <form action={formAction}>
        <input type="hidden" name="token" value={token} />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Joining..." : "Join household"}
        </Button>
      </form>
    </Card>
  );
}

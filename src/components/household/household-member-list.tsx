"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { archiveHouseholdMemberAction } from "@/app/(app)/settings/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { FormState } from "@/lib/form-state";
import type { HouseholdMemberSummary } from "@/lib/chore-engine";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type HouseholdMemberListProps = {
  members: HouseholdMemberSummary[];
  canEdit: boolean;
  locale: string;
  timezone: string;
};

function getRoleLabel(role: string) {
  switch (role) {
    case "owner":
      return "Owner";
    case "admin":
      return "Admin";
    default:
      return "Member";
  }
}

function formatJoinedAt(
  value: string,
  locale: string,
  timezone: string,
) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    dateStyle: "medium",
  }).format(new Date(value));
}

export function HouseholdMemberList({
  members,
  canEdit,
  locale,
  timezone,
}: HouseholdMemberListProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    archiveHouseholdMemberAction,
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
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Household members
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Keep the roster simple so everyone can see who’s in the house battle.
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

      {members.length ? (
        <div className="grid gap-3">
          {members.map((member) => (
            <Card key={member.id} className="space-y-3 border-muted-foreground/10">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-6">
                    {member.displayName}
                    {member.isViewer ? " (you)" : ""}
                  </p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {getRoleLabel(member.role)}
                  </p>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {member.role}
                </span>
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                Joined {formatJoinedAt(member.joinedAt, locale, timezone)}
              </p>

              {canEdit && member.role !== "owner" && !member.isViewer ? (
                <form action={formAction}>
                  <input type="hidden" name="memberId" value={member.id} />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full"
                    disabled={pending}
                  >
                    {pending ? "Archiving..." : "Archive member"}
                  </Button>
                </form>
              ) : null}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed bg-muted/40">
          <p className="text-sm font-semibold">No members yet</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Invite someone to start the beta household.
          </p>
        </Card>
      )}
    </Card>
  );
}

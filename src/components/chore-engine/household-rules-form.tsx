"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { saveHouseholdRulesAction } from "@/app/(app)/settings/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { FormState } from "@/lib/form-state";
import { getWeekStartLabel } from "@/lib/chore-engine";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type HouseholdRulesFormProps = {
  winnerRewardText: string | null;
  bottomForfeitText: string | null;
  weekStartsOn: number;
  canEdit: boolean;
};

export function HouseholdRulesForm({
  winnerRewardText,
  bottomForfeitText,
  weekStartsOn,
  canEdit,
}: HouseholdRulesFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    saveHouseholdRulesAction,
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
          House rules
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Keep the weekly reward, forfeit, and week start short, playful, and easy to scan.
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

      <form action={formAction} className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Leaderboard week starts on</span>
          <Select
            name="weekStartsOn"
            defaultValue={String(weekStartsOn)}
            disabled={!canEdit}
          >
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
          </Select>
          <p className="text-xs leading-5 text-muted-foreground">
            Your leaderboard week starts on {getWeekStartLabel(weekStartsOn)}.
            Leaderboard, rewards, and future insights all use this week window.
          </p>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Winner gets</span>
          <Input
            name="winnerRewardText"
            placeholder="Winner chooses takeaway"
            defaultValue={winnerRewardText ?? ""}
            maxLength={140}
            disabled={!canEdit}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Bottom gets</span>
          <Input
            name="bottomForfeitText"
            placeholder="Bottom does the washing up"
            defaultValue={bottomForfeitText ?? ""}
            maxLength={140}
            disabled={!canEdit}
          />
        </label>

        <div className="space-y-2">
          <Button type="submit" className="w-full" disabled={pending || !canEdit}>
            {pending ? "Saving..." : canEdit ? "Save house rules" : "Owner/admin only"}
          </Button>
          {!canEdit ? (
            <p className="text-xs leading-5 text-muted-foreground">
              Only owners and admins can edit these rules.
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}

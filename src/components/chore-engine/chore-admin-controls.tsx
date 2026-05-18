"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  archiveHouseholdChoreAction,
  updateHouseholdChoreAction,
} from "@/app/chores/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormState } from "@/lib/form-state";
import type { HouseholdChoreSummary } from "@/lib/chore-engine";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type ChoreAdminControlsProps = {
  chore: HouseholdChoreSummary;
};

export function ChoreAdminControls({ chore }: ChoreAdminControlsProps) {
  const router = useRouter();
  const [editState, editAction, editPending] = useActionState(
    updateHouseholdChoreAction,
    initialState,
  );
  const [archiveState, archiveAction, archivePending] = useActionState(
    archiveHouseholdChoreAction,
    initialState,
  );
  const editSuccessKey = useRef<string | null>(null);
  const archiveSuccessKey = useRef<string | null>(null);

  useEffect(() => {
    if (editPending) {
      editSuccessKey.current = null;
      return;
    }

    if (editState.status === "success" && editState.message) {
      const key = `edit:${editState.message}`;
      if (editSuccessKey.current !== key) {
        editSuccessKey.current = key;
        router.refresh();
      }
      return;
    }

    if (editState.status !== "success") {
      editSuccessKey.current = null;
    }
  }, [editPending, editState.message, editState.status, router]);

  useEffect(() => {
    if (archivePending) {
      archiveSuccessKey.current = null;
      return;
    }

    if (archiveState.status === "success" && archiveState.message) {
      const key = `archive:${archiveState.message}`;
      if (archiveSuccessKey.current !== key) {
        archiveSuccessKey.current = key;
        router.refresh();
      }
      return;
    }

    if (archiveState.status !== "success") {
      archiveSuccessKey.current = null;
    }
  }, [archivePending, archiveState.message, archiveState.status, router]);

  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-3">
      <details className="space-y-4">
        <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
          Edit or archive chore
        </summary>

        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <p className="text-xs leading-5 text-muted-foreground">
              Archiving pauses this chore and keeps its history.
            </p>
          </div>

          <form action={editAction} className="space-y-3">
            <input type="hidden" name="choreId" value={chore.id} />

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Chore name
              </span>
              <Input name="title" defaultValue={chore.title} maxLength={80} />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Points
                </span>
                <Input
                  name="points"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  defaultValue={String(chore.points)}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Cadence
                </span>
                <Input
                  name="cadence"
                  placeholder="Weekly"
                  defaultValue={chore.cadence ?? ""}
                  maxLength={80}
                />
              </label>
            </div>

            {editState.message ? (
              <p
                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                  editState.status === "error"
                    ? "border border-red-500/20 bg-red-500/10 text-red-800"
                    : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-800"
                }`}
                aria-live="polite"
                role="status"
              >
                {editState.message}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={editPending}>
              {editPending ? "Saving..." : "Save changes"}
            </Button>
          </form>

          <form action={archiveAction} className="space-y-2">
            <input type="hidden" name="choreId" value={chore.id} />

            {archiveState.message ? (
              <p
                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                  archiveState.status === "error"
                    ? "border border-red-500/20 bg-red-500/10 text-red-800"
                    : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-800"
                }`}
                aria-live="polite"
                role="status"
              >
                {archiveState.message}
              </p>
            ) : null}

            <Button type="submit" variant="secondary" className="w-full" disabled={archivePending}>
              {archivePending ? "Archiving..." : "Archive chore"}
            </Button>
          </form>
        </div>
      </details>
    </div>
  );
}

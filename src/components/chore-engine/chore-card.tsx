import { Card } from "@/components/ui/card";
import { getChoreIconGlyph, type HouseholdChoreSummary } from "@/lib/chore-engine";
import { ChoreCompleteButton } from "@/components/chore-engine/chore-complete-button";
import { ChoreAdminControls } from "@/components/chore-engine/chore-admin-controls";

type ChoreCardProps = {
  chore: HouseholdChoreSummary;
  canComplete: boolean;
  canManageChores?: boolean;
};

export function ChoreCard({ chore, canComplete, canManageChores = false }: ChoreCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-xl">
          {getChoreIconGlyph(chore.iconKey)}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-base font-semibold leading-6 text-foreground">
            {chore.title}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            {chore.cadence ? `${chore.cadence} · ` : ""}
            +{chore.points} points
          </p>
        </div>
        <span className="ml-auto rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          {chore.status === "active" ? "Active" : chore.status}
        </span>
      </div>

      {canComplete ? (
        <ChoreCompleteButton choreId={chore.id} points={chore.points} />
      ) : (
        <div className="rounded-2xl bg-muted/50 px-3 py-2">
          <p className="text-xs font-medium leading-5 text-muted-foreground">
            View only. Ask the owner or admin to complete or edit chores.
          </p>
        </div>
      )}

      {canManageChores ? <ChoreAdminControls chore={chore} /> : null}
    </Card>
  );
}

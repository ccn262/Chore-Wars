import { Card } from "@/components/ui/card";
import { getChoreIconGlyph, type HouseholdChoreSummary } from "@/lib/chore-engine";
import { ChoreCompleteButton } from "@/components/chore-engine/chore-complete-button";

type ChoreCardProps = {
  chore: HouseholdChoreSummary;
  canComplete: boolean;
};

export function ChoreCard({ chore, canComplete }: ChoreCardProps) {
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
      </div>

      {canComplete ? (
        <ChoreCompleteButton choreId={chore.id} points={chore.points} />
      ) : (
        <p className="text-xs leading-5 text-muted-foreground">
          View only. Ask the owner to complete or edit chores.
        </p>
      )}
    </Card>
  );
}

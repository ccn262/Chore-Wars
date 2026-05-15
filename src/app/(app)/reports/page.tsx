import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function ReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Reports"
        title="Visual summaries placeholder"
        description="Reports will later become colourful cards, badges, streaks, and charts."
        action={<Button href="/leaderboard" variant="secondary">Scores</Button>}
      />

      <div className="grid gap-3">
        <Card>
          <p className="text-sm font-semibold">Weekly summary</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This foundation keeps reporting separate from the main chore flow.
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold">Fairness view</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Future visuals will make household fairness easy to understand.
          </p>
        </Card>
      </div>
    </div>
  );
}


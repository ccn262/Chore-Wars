import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function LeaderboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Leaderboard"
        title="Scoreboard placeholder"
        description="Live and daily scores will appear here once the points ledger is implemented."
        action={<Button href="/reports" variant="secondary">Reports</Button>}
      />

      <div className="grid gap-3">
        <Card>
          <p className="text-sm font-semibold">Top positions</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Ranking, prizes, and forfeits will be visual and easy to scan.
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold">Current round</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This view will later show the household competition at a glance.
          </p>
        </Card>
      </div>
    </div>
  );
}


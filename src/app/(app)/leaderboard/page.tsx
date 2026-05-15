import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { RecentActivityFeed } from "@/components/chore-engine/recent-activity-feed";
import { ScoreSummary } from "@/components/chore-engine/score-summary";
import { getChoreEngineDashboard } from "@/lib/chore-engine";
import { getViewerContext } from "@/lib/auth";

export default async function LeaderboardPage() {
  const viewer = await getViewerContext();
  const dashboard = await getChoreEngineDashboard(viewer);

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Leaderboard"
        title="Who’s winning"
        description="A simple, phone-friendly view of the household scoreboard."
      />

      <ScoreSummary
        scores={dashboard.weeklyScores}
        weekStartsOn={dashboard.settings.weekStartsOn}
      />

      <Card className="space-y-2 bg-muted/40">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Quick read
        </p>
        <p className="text-sm leading-6 text-foreground">
          The leaderboard stays simple for now: clear names, clear points, clear winner.
        </p>
      </Card>

      <RecentActivityFeed
        activity={dashboard.activity}
        locale={dashboard.settings.locale}
        timezone={dashboard.settings.timezone}
      />
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { ChoreCard } from "@/components/chore-engine/chore-card";
import { RecentActivityFeed } from "@/components/chore-engine/recent-activity-feed";
import { ScoreSummary } from "@/components/chore-engine/score-summary";
import { TemplateCard } from "@/components/chore-engine/template-card";
import { getChoreEngineDashboard } from "@/lib/chore-engine";
import { getViewerContext } from "@/lib/auth";

export default async function HomePage() {
  const viewer = await getViewerContext();
  const dashboard = await getChoreEngineDashboard(viewer);
  const { household, profile } = viewer;
  const quickChores = dashboard.quickChores.slice(0, 4);
  const starterTemplates = dashboard.templates.slice(0, 4);
  const leadingMember = dashboard.weeklyScores[0];
  const viewerScore = dashboard.weeklyScores.find((score) => score.isViewer);
  const nextAction = quickChores[0] ?? starterTemplates[0];

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Home"
        title={`Welcome back${profile ? `, ${profile.display_name}` : ""}`}
        description={
          household
            ? `${household.name} is live. Tap a chore, score points, and keep the house fair.`
            : "Your household will appear here once setup is complete."
        }
        action={<Button href="/chores" variant="secondary">View all chores</Button>}
      />

      <Card className="space-y-4 border-foreground/10 bg-foreground text-background">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/70">
            Fast path
          </p>
          <p className="text-lg font-semibold leading-7">
            Tap once, score points, and keep the house fair.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] bg-background/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-background/70">
              Scoreboard
            </p>
            <p className="mt-1 text-sm font-semibold leading-6">
              {leadingMember
                ? `${leadingMember.displayName} is leading with ${leadingMember.points} points.`
                : "No scores yet. The first tap will start the board."}
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-background/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-background/70">
              Your score
            </p>
            <p className="mt-1 text-sm font-semibold leading-6">
              {viewerScore ? `${viewerScore.points} points this week.` : "No points yet."}
            </p>
          </div>
        </div>
      </Card>

      <ScoreSummary
        scores={dashboard.weeklyScores}
        weekStartsOn={dashboard.settings.weekStartsOn}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {quickChores.length ? "Quick chores" : "Starter templates"}
          </h2>
          <Button href="/chores" variant="secondary" className="shrink-0">
            View all chores
          </Button>
        </div>

        {quickChores.length ? (
          <div className="grid gap-3">
            {quickChores.map((chore) => (
              <ChoreCard
                key={chore.id}
                chore={chore}
                canComplete={true}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            {starterTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                canManageChores={dashboard.canManageChores}
              />
            ))}
            {!starterTemplates.length ? (
              <Card className="space-y-2">
                <p className="text-sm font-semibold">No chores yet</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Add starter chores on the Chores screen to unlock the fast tap flow.
                </p>
              </Card>
            ) : null}
          </div>
        )}
      </div>

      <RecentActivityFeed
        activity={dashboard.activity}
        locale={dashboard.settings.locale}
        timezone={dashboard.settings.timezone}
      />

      {nextAction ? (
        <Card className="space-y-2 bg-muted/40">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Next move
          </p>
          <p className="text-sm leading-6 text-foreground">
            {quickChores.length
              ? `Tap ${nextAction.title} to keep the week moving.`
              : `Add ${nextAction.title} from the starter templates to begin.`}
          </p>
        </Card>
      ) : null}
    </div>
  );
}

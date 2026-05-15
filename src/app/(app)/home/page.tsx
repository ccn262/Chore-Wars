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
  const chores = dashboard.chores.slice(0, 4);
  const starterTemplates = dashboard.templates.slice(0, 4);

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
        action={<Button href="/chores" variant="secondary">Chores</Button>}
      />

      <Card className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Quick tap
        </p>
        <p className="text-lg font-semibold leading-7">
          Tap a chore below to record completion and add points straight away.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          The home screen stays focused on the fastest path in the app.
        </p>
      </Card>

      <ScoreSummary
        scores={dashboard.weeklyScores}
        weekStartsOn={dashboard.settings.weekStartsOn}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {chores.length ? "Quick chores" : "Starter templates"}
          </h2>
          <Button href="/chores" variant="secondary" className="shrink-0">
            Manage
          </Button>
        </div>

        {chores.length ? (
          <div className="grid gap-3">
            {chores.map((chore) => (
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
    </div>
  );
}

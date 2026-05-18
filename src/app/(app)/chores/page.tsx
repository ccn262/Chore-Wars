import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { ChoreCard } from "@/components/chore-engine/chore-card";
import { CustomChoreForm } from "@/components/chore-engine/custom-chore-form";
import { TemplateCard } from "@/components/chore-engine/template-card";
import { getChoreEngineDashboard } from "@/lib/chore-engine";
import { getViewerContext } from "@/lib/auth";

export default async function ChoresPage() {
  const viewer = await getViewerContext();
  const dashboard = await getChoreEngineDashboard(viewer);

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Chores"
        title="Household chores"
        description="Create starter chores, add a custom one, and keep the home loop moving."
        action={<Button href="/home" variant="secondary">Home</Button>}
      />

      <Card className="space-y-2 bg-muted/40">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          One tap
        </p>
        <p className="text-sm leading-6 text-foreground">
          Add a chore, then complete it quickly from Home or here. Keep the tap count low.
        </p>
      </Card>

      {dashboard.chores.length ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Active chores
          </p>
          <div className="grid gap-3">
            {dashboard.chores.map((chore) => (
              <ChoreCard
                key={chore.id}
                chore={chore}
                canComplete={true}
                canManageChores={dashboard.canManageChores}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="space-y-2">
          <p className="text-sm font-semibold">No active chores yet</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Add a starter chore below to unlock the one-tap completion flow.
          </p>
        </Card>
      )}

      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Starter templates
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Use a seeded template to add a household chore with the right points and icon.
        </p>
        <div className="grid gap-3">
          {dashboard.templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              canManageChores={dashboard.canManageChores}
            />
          ))}
        </div>
      </div>

      <CustomChoreForm />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Home"
        title="Household scoreboard"
        description="This is the main hero surface. Later, chore taps and points will live here."
        action={<Button href="/setup/create-household" variant="secondary">Setup</Button>}
      />

      <Card className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Placeholder
        </p>
        <p className="text-lg font-semibold leading-7">
          The quick chore tap flow will be built on top of this shell.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Keep the layout light, thumb-friendly, and easy to scan on a phone.
        </p>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <p className="text-sm font-semibold">Today</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Live chores and points will appear here later.
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold">Shortcuts</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Fast actions for chores, rewards, and setup will land here.
          </p>
        </Card>
      </div>
    </div>
  );
}


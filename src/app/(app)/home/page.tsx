import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { getViewerContext } from "@/lib/auth";

export default async function HomePage() {
  const viewer = await getViewerContext();

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Home"
        title={`Welcome back${viewer.profile ? `, ${viewer.profile.display_name}` : ""}`}
        description={
          viewer.household
            ? `${viewer.household.name} is ready. The quick chore flow will land here next.`
            : "Your household will appear here once setup is complete."
        }
        action={<Button href="/settings" variant="secondary">Settings</Button>}
      />

      <Card className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Auth foundation
        </p>
        <p className="text-lg font-semibold leading-7">
          Sign-in, sign-up, session handling, and household onboarding are now
          connected.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          The chore engine will use this surface later, but the foundation now
          keeps the app shell protected and ready.
        </p>
      </Card>

      <div className="grid gap-3">
        <Card>
          <p className="text-sm font-semibold">Current household</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {viewer.household
              ? `${viewer.household.name} · ${viewer.household.memberRole}`
              : "Create a household to continue."}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold">Next phase</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Chore cards, points, and reporting will be added after auth is
            stable.
          </p>
        </Card>
      </div>
    </div>
  );
}

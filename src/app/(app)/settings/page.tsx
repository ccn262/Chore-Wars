import { signOutAction } from "@/app/auth/actions";
import { HouseholdRulesForm } from "@/components/chore-engine/household-rules-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { getChoreEngineDashboard } from "@/lib/chore-engine";
import { getViewerContext } from "@/lib/auth";

export default async function SettingsPage() {
  const viewer = await getViewerContext();
  const dashboard = await getChoreEngineDashboard(viewer);

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Settings"
        title="Household settings"
        description="Account, household, and house rule basics are live. More controls come later."
        action={<Button href="/home" variant="secondary">Home</Button>}
      />

      <div className="grid gap-3">
        <Card className="space-y-2">
          <p className="text-sm font-semibold">Signed in as</p>
          <p className="text-sm leading-6 text-muted-foreground">
            {viewer.profile?.display_name ?? "Household member"}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            {viewer.profile?.email ?? "No email available"}
          </p>
        </Card>

        <Card className="space-y-2">
          <p className="text-sm font-semibold">Household</p>
          <p className="text-sm leading-6 text-muted-foreground">
            {viewer.household?.name ?? "No household selected"}
          </p>
        </Card>

        <HouseholdRulesForm
          winnerRewardText={dashboard.settings.winnerRewardText}
          bottomForfeitText={dashboard.settings.bottomForfeitText}
          canEdit={dashboard.canManageChores}
        />

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Session</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Use sign out to test the protected route flow.
          </p>
          <form action={signOutAction}>
            <Button type="submit" variant="secondary" className="w-full">
              Sign out
            </Button>
          </form>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Production basics</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Draft policy and support pages for hosted testing. Replace them
            with final legal copy before release.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/privacy" variant="secondary" className="w-full">
              Privacy policy
            </Button>
            <Button href="/terms" variant="secondary" className="w-full">
              Terms of use
            </Button>
            <Button href="/support" variant="secondary" className="w-full">
              Support
            </Button>
            <Button href="/account-deletion" variant="secondary" className="w-full">
              Account deletion
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

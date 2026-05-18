import { signOutAction } from "@/app/auth/actions";
import { HouseholdMemberList } from "@/components/household/household-member-list";
import { HouseholdInviteManager } from "@/components/invites/household-invite-manager";
import { HouseholdRulesForm } from "@/components/chore-engine/household-rules-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { getChoreEngineDashboard } from "@/lib/chore-engine";
import { getViewerContext } from "@/lib/auth";
import { getHouseholdInvitesForHousehold } from "@/lib/household-invites";

export default async function SettingsPage() {
  const viewer = await getViewerContext();
  const dashboard = await getChoreEngineDashboard(viewer);
  const invites =
    viewer.supabase && viewer.household
      ? await getHouseholdInvitesForHousehold(viewer.supabase, viewer.household.id)
      : [];

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Settings"
        title="Household settings"
        description="Account, household, members, house rules, and invites are live for hosted testing. More controls come later."
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

        {viewer.household ? (
          dashboard.members.length <= 1 ? (
            <Card className="space-y-3 border-dashed bg-muted/40">
              <div className="space-y-1">
                <p className="text-sm font-semibold">First-run checklist</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Invite your household, add a couple of chores, then start from Home with the big quick-action buttons.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="#household-members"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-surface px-4 text-sm font-semibold text-foreground ring-1 ring-border transition hover:bg-muted active:translate-y-px"
                >
                  Check members
                </a>
                <Button href="/chores" variant="secondary" className="w-full">
                  Add chores
                </Button>
              </div>
            </Card>
          ) : null
        ) : null}

        {viewer.household ? (
          <div id="household-members">
            <HouseholdMemberList
              members={dashboard.members}
              canEdit={dashboard.canManageChores}
              locale={dashboard.settings.locale}
              timezone={dashboard.settings.timezone}
            />
          </div>
        ) : null}

        <HouseholdRulesForm
          winnerRewardText={dashboard.settings.winnerRewardText}
          bottomForfeitText={dashboard.settings.bottomForfeitText}
          weekStartsOn={dashboard.settings.weekStartsOn}
          canEdit={dashboard.canManageChores}
        />

        {dashboard.canManageChores ? (
          <HouseholdInviteManager
            canEdit={dashboard.canManageChores}
            invites={invites}
            locale={dashboard.settings.locale}
            timezone={dashboard.settings.timezone}
          />
        ) : null}

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

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Beta feedback</p>
          <p className="text-sm leading-6 text-muted-foreground">
            If a screen feels confusing, send a short note and mention what you were trying to do.
          </p>
          <Button href="/support" variant="secondary" className="w-full">
            Open support
          </Button>
        </Card>
      </div>
    </div>
  );
}

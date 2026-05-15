import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { appName } from "@/lib/site";
import { getViewerContext } from "@/lib/auth";

export default async function LandingPage() {
  const viewer = await getViewerContext();

  if (viewer.session) {
    redirect(viewer.household ? "/home" : "/setup/create-household");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Phase 3"
          title={appName}
          description="Turn household chores into a fast, fair competition for real homes."
        />

        <Card className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              What this is
            </p>
            <p className="text-lg font-semibold leading-7">
              A mobile-first chore competition app with clean auth and quick
              onboarding.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Sign in to reach your household, or create an account to get
              started. The chore engine comes later.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/auth/sign-up" className="w-full sm:flex-1">
              Get started
            </Button>
            <Button
              href="/auth/sign-in"
              variant="secondary"
              className="w-full sm:flex-1"
            >
              Sign in
            </Button>
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Foundation goals
          </p>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            <li>Supabase Auth connection with simple mobile forms.</li>
            <li>Household onboarding that creates the first owner member.</li>
            <li>Protected app routes ready for the chore engine later.</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Production basics
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Draft legal and support pages for hosted testing and early review.
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
    </main>
  );
}

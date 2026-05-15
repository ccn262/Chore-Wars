import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { appName } from "@/lib/site";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Phase 1 scaffold"
          title={appName}
          description="A mobile-first chore competition app that turns household fairness into a quick tap."
        />

        <Card className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              What this is
            </p>
            <p className="text-lg font-semibold leading-7">
              A phone-first shell for chore battles, quick taps, and clear scores.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              The implementation phase starts with the app foundation only. No
              chore engine, no auth logic, and no reporting logic yet.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/home" className="w-full sm:flex-1">
              Enter the app shell
            </Button>
            <Button href="/setup/create-household" variant="secondary" className="w-full sm:flex-1">
              Start setup
            </Button>
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Foundation goals
          </p>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            <li>Mobile-first shell with bottom navigation.</li>
            <li>Placeholder routes for auth, setup, and dashboard areas.</li>
            <li>Reusable primitives ready for later feature work.</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}


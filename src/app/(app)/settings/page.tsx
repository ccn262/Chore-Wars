import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Settings"
        title="Household settings placeholder"
        description="This area will later hold members, household setup, and app preferences."
        action={<Button href="/auth/sign-in" variant="secondary">Sign in</Button>}
      />

      <div className="grid gap-3">
        <Card>
          <p className="text-sm font-semibold">Household</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Add, edit, or remove members and chores later from a simple mobile UI.
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold">Preferences</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Locale-aware dates, currencies, and future internationalisation belong here.
          </p>
        </Card>
      </div>
    </div>
  );
}


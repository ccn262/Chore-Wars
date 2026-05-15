import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function AddMembersPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Setup"
          title="Add members placeholder"
          description="Members will stay separate from auth users in the later data model."
        />

        <Card className="space-y-3">
          <p className="text-sm leading-6 text-muted-foreground">
            This screen is reserved for household member setup and invitations.
          </p>
          <Button href="/setup/starter-chores">Continue</Button>
        </Card>
      </div>
    </main>
  );
}


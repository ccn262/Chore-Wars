import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function CreateHouseholdPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Setup"
          title="Create household placeholder"
          description="The first-run setup flow will be added later once the scaffold stabilises."
        />

        <Card className="space-y-3">
          <p className="text-sm leading-6 text-muted-foreground">
            Household creation, invite flows, and persistence are not implemented yet.
          </p>
          <Button href="/setup/add-members">Next step</Button>
        </Card>
      </div>
    </main>
  );
}


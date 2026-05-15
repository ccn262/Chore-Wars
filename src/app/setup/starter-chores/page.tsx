import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function StarterChoresPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Setup"
          title="Starter chores placeholder"
          description="Default chores will be offered at setup, but the chore engine is not built yet."
        />

        <Card className="space-y-3">
          <p className="text-sm leading-6 text-muted-foreground">
            This route exists so onboarding can expand later without changing the shell.
          </p>
          <Button href="/home">Finish scaffold tour</Button>
        </Card>
      </div>
    </main>
  );
}


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Auth"
          title="Sign in placeholder"
          description="Real auth will come later. This route just marks the shell."
        />

        <Card className="space-y-3">
          <p className="text-sm leading-6 text-muted-foreground">
            Sign-in forms, Supabase auth wiring, and session handling are out of
            scope for Phase 1.
          </p>
          <Button href="/home">Go to home</Button>
        </Card>
      </div>
    </main>
  );
}


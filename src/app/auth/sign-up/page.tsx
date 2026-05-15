import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Auth"
          title="Sign up placeholder"
          description="Account creation flows will come after the foundation is stable."
        />

        <Card className="space-y-3">
          <p className="text-sm leading-6 text-muted-foreground">
            This route exists so the app shell can be wired before real auth work begins.
          </p>
          <Button href="/setup/create-household">Continue to setup</Button>
        </Card>
      </div>
    </main>
  );
}


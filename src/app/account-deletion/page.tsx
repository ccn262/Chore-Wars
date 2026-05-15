import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function AccountDeletionPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex flex-col gap-4">
        <ScreenHeader
          eyebrow="Draft"
          title="Account deletion"
          description="A simple request path for production-readiness testing. Replace this with the final deletion flow before release."
        />

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Request steps</p>
          <ol className="space-y-2 text-sm leading-6 text-muted-foreground">
            <li>1. Open the support page if you need help first.</li>
            <li>2. Confirm the account you want removed.</li>
            <li>3. Expect account, profile, and household membership data to be reviewed for deletion.</li>
            <li>4. Replace this draft path with the final deletion flow later.</li>
          </ol>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Status</p>
          <p className="text-sm leading-6 text-muted-foreground">
            This page exists so production testing can verify that an account
            deletion path is discoverable. It is not the final submission flow.
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Self-service deletion is planned for later. During early testing,
            contact support to request deletion.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/support" variant="secondary" className="w-full sm:flex-1">
              Support
            </Button>
            <Button href="/privacy" variant="secondary" className="w-full sm:flex-1">
              Privacy policy
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

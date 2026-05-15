import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function TermsPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex flex-col gap-4">
        <ScreenHeader
          eyebrow="Draft"
          title="Terms of use"
          description="This is a draft placeholder for production-readiness testing. Replace it with reviewed legal copy before launch."
        />

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Draft sections</p>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            <li>Early testing status and beta-style expectations.</li>
            <li>Household account responsibilities and fair use.</li>
            <li>Data sharing within a household.</li>
            <li>Support and deletion request expectations.</li>
            <li>Future updates and changes to the service.</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Status</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Draft only. Final legal review is still required before submission
            or wider release.
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Chore Wars is intended for household use. During early testing, the
            app may change quickly and service availability is not guaranteed.
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

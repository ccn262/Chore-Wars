import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { supportEmail } from "@/lib/site";

export default function SupportPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex flex-col gap-4">
        <ScreenHeader
          eyebrow="Draft"
          title="Support"
          description="A simple placeholder support page for production-readiness testing."
        />

        <Card className="space-y-3">
          <p className="text-sm font-semibold">What to do right now</p>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            <li>Use this page to point testers toward help and deletion steps.</li>
            <li>Keep private contact details out of the public UI for now.</li>
            <li>Replace this draft with a real support contact before launch.</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Support contact</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Early testers can use this placeholder contact for help with the app
            or account deletion requests.
          </p>
          <p className="rounded-2xl bg-muted px-4 py-3 text-sm font-semibold text-foreground">
            {supportEmail}
          </p>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Helpful links</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/privacy" variant="secondary" className="w-full">
              Privacy policy
            </Button>
            <Button href="/terms" variant="secondary" className="w-full">
              Terms of use
            </Button>
            <Button href="/account-deletion" variant="secondary" className="w-full">
              Account deletion
            </Button>
            <Button href="/home" variant="secondary" className="w-full">
              Home
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

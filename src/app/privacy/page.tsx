import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex flex-col gap-4">
        <ScreenHeader
          eyebrow="Draft"
          title="Privacy policy"
          description="This is a draft placeholder for production-readiness testing. Replace it with reviewed legal copy before launch."
        />

        <Card className="space-y-3">
          <p className="text-sm font-semibold">What this draft covers</p>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            <li>Account email and auth data used to sign in.</li>
            <li>Household and member names or nicknames used in the app.</li>
            <li>Chore completion and points data needed for the core loop.</li>
            <li>Optional future photo proof, if it is added later.</li>
            <li>Support and account deletion requests.</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Status</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Draft only. Do not treat this page as final legal advice or final
            release copy.
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Chore Wars uses Supabase for auth and data storage and Vercel for
            hosting. We do not sell personal data.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/support" variant="secondary" className="w-full sm:flex-1">
              Support
            </Button>
            <Button href="/account-deletion" variant="secondary" className="w-full sm:flex-1">
              Account deletion
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

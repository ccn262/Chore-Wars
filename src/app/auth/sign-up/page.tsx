import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { AuthForm } from "@/components/auth/auth-form";
import { signUpAction } from "@/app/auth/actions";
import { getViewerContext } from "@/lib/auth";
import type { Route } from "next";
import { addInternalQueryParam, normalizeInternalPath } from "@/lib/navigation";

type SignUpPageProps = {
  searchParams?:
    | {
        next?: string | string[];
      }
    | Promise<{
        next?: string | string[];
      }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const viewer = await getViewerContext();
  const resolvedSearchParams = await searchParams;
  const returnTo = normalizeInternalPath(
    typeof resolvedSearchParams?.next === "string"
      ? resolvedSearchParams.next
      : "",
    "",
  );
  const signInHref = returnTo
    ? (addInternalQueryParam("/auth/sign-in", "next", returnTo) as Route)
    : "/auth/sign-in";

  if (viewer.session) {
    redirect(viewer.household ? "/home" : "/setup/create-household");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Auth"
          title="Create account"
          description="Set up your Chore Wars account and get the household moving."
        />

        <AuthForm
          title="Start here"
          description="Create a simple account for yourself. Your first household comes next."
          action={signUpAction}
          submitLabel="Create account"
          alternateHref={signInHref}
          alternateLabel="I already have an account"
          showDisplayName
          returnTo={returnTo || undefined}
        />

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Before launch</p>
          <p className="text-sm leading-6 text-muted-foreground">
            These draft support pages stay visible during early hosted testing so
            testers know where to go for help.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button href="/support" variant="secondary" className="w-full">
              Support
            </Button>
            <Button href="/privacy" variant="secondary" className="w-full">
              Privacy
            </Button>
            <Button href="/account-deletion" variant="secondary" className="w-full">
              Account deletion
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

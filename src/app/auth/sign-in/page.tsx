import type { Route } from "next";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { AuthForm } from "@/components/auth/auth-form";
import { signInAction } from "@/app/auth/actions";
import { getViewerContext } from "@/lib/auth";
import { addInternalQueryParam, normalizeInternalPath } from "@/lib/navigation";

type SignInPageProps = {
  searchParams?: {
    next?: string | string[];
  };
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const viewer = await getViewerContext();
  const returnTo = normalizeInternalPath(
    typeof searchParams?.next === "string" ? searchParams.next : "",
    "",
  );
  const signUpHref = returnTo
    ? (addInternalQueryParam("/auth/sign-up", "next", returnTo) as Route)
    : "/auth/sign-up";

  if (viewer.session) {
    redirect(viewer.household ? "/home" : "/setup/create-household");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Auth"
          title="Sign in"
          description="Use your existing account to reach your household."
        />

        <AuthForm
          title="Welcome back"
          description="Sign in with the same email and password you used to create your account."
          action={signInAction}
          submitLabel="Sign in"
          alternateHref={signUpHref}
          alternateLabel="Create an account"
          returnTo={returnTo || undefined}
        />

        <Card className="space-y-3">
          <p className="text-sm font-semibold">Need help?</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Use the draft support pages while the app is in early hosted testing.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button href="/support" variant="secondary" className="w-full">
              Support
            </Button>
            <Button href="/privacy" variant="secondary" className="w-full">
              Privacy
            </Button>
            <Button href="/terms" variant="secondary" className="w-full">
              Terms
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

import { redirect } from "next/navigation";

import { ScreenHeader } from "@/components/screen-header";
import { AuthForm } from "@/components/auth/auth-form";
import { signInAction } from "@/app/auth/actions";
import { getViewerContext } from "@/lib/auth";

export default async function SignInPage() {
  const viewer = await getViewerContext();

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
          alternateHref="/auth/sign-up"
          alternateLabel="Create an account"
        />
      </div>
    </main>
  );
}

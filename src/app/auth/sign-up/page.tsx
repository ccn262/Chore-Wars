import { redirect } from "next/navigation";

import { ScreenHeader } from "@/components/screen-header";
import { AuthForm } from "@/components/auth/auth-form";
import { signUpAction } from "@/app/auth/actions";
import { getViewerContext } from "@/lib/auth";

export default async function SignUpPage() {
  const viewer = await getViewerContext();

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
          alternateHref="/auth/sign-in"
          alternateLabel="I already have an account"
          showDisplayName
        />
      </div>
    </main>
  );
}

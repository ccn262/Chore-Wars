import { redirect } from "next/navigation";

import { HouseholdForm } from "@/components/auth/household-form";
import { ScreenHeader } from "@/components/screen-header";
import { createHouseholdAction } from "@/app/setup/actions";
import { getViewerContext } from "@/lib/auth";

export default async function CreateHouseholdPage() {
  const viewer = await getViewerContext();

  if (!viewer.session) {
    redirect("/auth/sign-in");
  }

  if (viewer.household) {
    redirect("/home");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Setup"
          title="Create your household"
          description="Give your home a name so the owner record can be created and protected routes can open."
        />

        <HouseholdForm action={createHouseholdAction} />
      </div>
    </main>
  );
}

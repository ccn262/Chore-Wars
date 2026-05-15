import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app-shell";
import { getViewerContext } from "@/lib/auth";

export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const viewer = await getViewerContext();

  if (!viewer.session) {
    redirect("/auth/sign-in");
  }

  if (!viewer.household) {
    redirect("/setup/create-household");
  }

  return <AppShell>{children}</AppShell>;
}

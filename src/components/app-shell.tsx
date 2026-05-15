import type { ReactNode } from "react";

import { BottomNav } from "@/components/bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(248,242,234,1)_42%,_rgba(242,236,225,1)_100%)] text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-32 pt-4">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}


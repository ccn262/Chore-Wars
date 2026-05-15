"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { appSections } from "@/lib/site";
import {
  ChoresIcon,
  HomeIcon,
  LeaderboardIcon,
  ReportsIcon,
  SettingsIcon,
} from "@/components/ui/icons";

const navIcons = {
  Home: HomeIcon,
  Chores: ChoresIcon,
  Leaderboard: LeaderboardIcon,
  Reports: ReportsIcon,
  Settings: SettingsIcon,
} as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/92 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[560px] items-stretch gap-1 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        {appSections.map((item) => {
          const Icon = navIcons[item.label];
          const active =
            pathname === item.href ||
            (item.href !== "/home" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-[1.25rem] px-2 text-[11px] font-semibold transition ${
                active
                  ? "bg-foreground text-background shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


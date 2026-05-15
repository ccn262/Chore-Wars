export const appName =
  process.env.NEXT_PUBLIC_APP_NAME?.trim() || "Chore Wars";

export const appUrl =
  (process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000").replace(
    /\/$/,
    "",
  );

export const defaultLocale =
  process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.trim() || "en-GB";

export const defaultTimezone =
  process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE?.trim() || "Europe/London";

export const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@example.com";

export const appSections = [
  { href: "/home", label: "Home" },
  { href: "/chores", label: "Chores" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
] as const;


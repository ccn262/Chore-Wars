import type { PropsWithChildren } from "react";

type IconProps = {
  className?: string;
};

function SvgIcon({
  children,
  className,
}: PropsWithChildren<IconProps>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.75V21h13V9.75" />
      <path d="M9.5 21v-6h5v6" />
    </SvgIcon>
  );
}

export function ChoresIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M5 7.5h14" />
      <path d="M5 12h14" />
      <path d="M5 16.5h9" />
      <path d="M18 16.5l1.5 1.5L22 15" />
    </SvgIcon>
  );
}

export function LeaderboardIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M7 21V11" />
      <path d="M12 21V3" />
      <path d="M17 21v-8" />
      <path d="M5 21h14" />
    </SvgIcon>
  );
}

export function ReportsIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M4.5 19.5h15" />
      <path d="M7 16v-4" />
      <path d="M12 16V8" />
      <path d="M17 16v-6" />
    </SvgIcon>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15a3.5 3.5 0 0 0 0-6.5Z" />
      <path d="M19 12a7.2 7.2 0 0 0-.1-1l2-1.4-1.8-3.2-2.3.7a7.6 7.6 0 0 0-1.7-1l-.3-2.4H9.2l-.3 2.4a7.6 7.6 0 0 0-1.7 1l-2.3-.7L3.1 9.6l2 1.4a7.2 7.2 0 0 0 0 2l-2 1.4 1.8 3.2 2.3-.7a7.6 7.6 0 0 0 1.7 1l.3 2.4h4.4l.3-2.4a7.6 7.6 0 0 0 1.7-1l2.3.7 1.8-3.2-2-1.4c.1-.3.1-.6.1-1Z" />
    </SvgIcon>
  );
}

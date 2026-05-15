import type { HTMLAttributes, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Card({
  children,
  className = "",
  ...rest
}: CardProps) {
  return (
    <section
      className={`rounded-[1.5rem] border border-border bg-surface p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}


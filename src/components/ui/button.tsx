import Link from "next/link";
import type { Route } from "next";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: Route;
  variant?: Variant;
  className?: string;
} & Pick<ComponentPropsWithoutRef<"button">, "type" | "onClick" | "disabled">;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-foreground text-background shadow-[0_10px_24px_rgba(30,41,59,0.16)] hover:-translate-y-0.5",
  secondary:
    "bg-surface text-foreground ring-1 ring-border hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-full px-4 text-sm font-semibold transition active:translate-y-px";
  const styles = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} {...rest}>
      {children}
    </button>
  );
}

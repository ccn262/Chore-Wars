import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", ...rest }: SelectProps) {
  return (
    <select
      className={`min-h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 ${className}`}
      {...rest}
    />
  );
}

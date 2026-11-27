import { forwardRef } from "react";

import type { BadgeProps, BadgeVariant } from "./Badge.types";
import { cn } from "../../../lib/utils";

const variantClasses: Record<BadgeVariant, string> = {
  primary: `
    bg-[var(--dil-color-primary)]
    text-[color:var(--dil-color-primary-foreground,var(--dil-color-text,currentColor))]
  `,
  secondary: `
    bg-[var(--dil-color-secondary)]
    text-[color:var(--dil-color-secondary-foreground,var(--dil-color-text,currentColor))]
  `,
  outline: `
    bg-[var(--dil-color-surface)]
    text-[var(--dil-color-text)]
  `,
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex",
      "items-center",
      "rounded-[var(--dil-radius-sm)]",
      "border-2",
      "border-(--dil-color-border)",
      "px-2.5",
      "py-1",
      "text-(length:--dil-font-xs)",
      "font-(--dil-font-weight-bold)",
      "uppercase",
      "tracking-[0.08em]",
      "shadow-(--dil-shadow-sm)",
      variantClasses[variant],
      className,
    );

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

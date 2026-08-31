import { forwardRef } from "react";

import type { BadgeProps, BadgeVariant } from "./Badge.types";
import { cn } from "../../../lib/utils";

const variantClasses: Record<BadgeVariant, string> = {
  primary: `
    bg-[var(--dil-color-primary)]
    text-[var(--dil-color-text)]
    border-[var(--dil-color-border)]
  `,
  secondary: `
    bg-[var(--dil-color-secondary)]
    text-[var(--dil-color-text)]
    border-[var(--dil-color-border)]
  `,
  outline: `
    bg-transparent
    text-[var(--dil-color-text)]
    border-[var(--dil-color-border)]
  `,
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex",
      "items-center",
      "rounded-[var(--dil-radius-sm)]",
      "border",
      "px-2",
      "py-0.5",
      "text-[var(--dil-font-xs)]",
      "font-medium",
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

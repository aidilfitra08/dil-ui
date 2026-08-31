import { forwardRef } from "react";

import type { CardPadding, CardProps } from "./Card.types";
import { cn } from "../../../lib/utils";

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = "md", className, children, ...props }, ref) => {
    const classes = cn(
      "rounded-[var(--dil-radius-md)]",
      "border",
      "border-[var(--dil-color-border)]",
      "bg-[var(--dil-color-surface)]",
      "text-[var(--dil-color-text)]",
      "shadow-[var(--dil-shadow-sm)]",
      paddingClasses[padding],
      className,
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

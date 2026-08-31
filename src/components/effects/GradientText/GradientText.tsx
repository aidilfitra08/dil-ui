import { forwardRef } from "react";

import type { GradientTextProps } from "./GradientText.types";
import { cn } from "../../../lib/utils";

export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, children, gradientClassName, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "bg-linear-to-r",
        "from-[var(--dil-color-primary)]",
        "to-[var(--dil-color-secondary)]",
        "bg-clip-text",
        "text-transparent",
        gradientClassName,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
);

GradientText.displayName = "GradientText";

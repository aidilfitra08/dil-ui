import { forwardRef } from "react";

import { cn } from "../../../lib/utils";
import type { LoadingBarProps, LoadingBarVariant } from "./LoadingBar.types";

const variantClasses: Record<LoadingBarVariant, string> = {
  primary: "bg-[var(--dil-color-primary)]",
  secondary: "bg-[var(--dil-color-secondary)]",
  success: "bg-[var(--dil-color-success)]",
  info: "bg-[var(--dil-color-info)]",
};

export const LoadingBar = forwardRef<HTMLDivElement, LoadingBarProps>(
  (
    {
      value = 0,
      max = 100,
      indeterminate = false,
      variant = "primary",
      label = "Loading",
      className,
      ...props
    },
    ref,
  ) => {
    const safeMax = max > 0 ? max : 100;
    const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={
          indeterminate ? undefined : Math.min(safeMax, Math.max(0, value))
        }
        className={cn(
          "relative h-3 w-full overflow-hidden border-2 border-(--dil-color-border) bg-(--dil-color-surface) shadow-(--dil-shadow-sm)",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-[width] duration-300",
            variantClasses[variant],
            indeterminate &&
              "absolute w-1/2 animate-[loading-bar_1.2s_ease-in-out_infinite]",
          )}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    );
  },
);

LoadingBar.displayName = "LoadingBar";

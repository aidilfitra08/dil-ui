import { forwardRef } from "react";

import type { ProgressProps, ProgressSize } from "./Progress.types";
import { cn } from "../../../lib/utils";

const sizeClasses: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size = "md",
      label = "Progress",
      showValue = false,
      ...props
    },
    ref,
  ) => {
    const safeMax = max > 0 ? max : 100;
    const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100));

    return (
      <div className={cn("w-full", className)} {...props}>
        <div
          ref={ref}
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={safeMax}
          aria-valuenow={Math.min(safeMax, Math.max(0, value))}
          className={cn(
            "w-full overflow-hidden rounded-full bg-(--dil-color-muted)",
            sizeClasses[size],
          )}
        >
          <div
            className="h-full rounded-full bg-(--dil-color-primary) transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue ? (
          <div className="mt-1 text-right text-(length:--dil-font-xs) text-(--dil-color-text)">
            {Math.round(percentage)}%
          </div>
        ) : null}
      </div>
    );
  },
);

Progress.displayName = "Progress";

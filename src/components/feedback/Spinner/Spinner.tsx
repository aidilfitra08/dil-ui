import { forwardRef } from "react";

import type { SpinnerProps, SpinnerSize } from "./Spinner.types";
import { cn } from "../../../lib/utils";

const sizeClasses: Record<SpinnerSize, string> = {
  xs: "size-3 border-2",
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-3",
  xl: "size-12 border-4",
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", label = "Loading", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(
        "inline-block motion-safe:animate-spin motion-reduce:animate-none rounded-full border-(--dil-color-muted) border-t-(--dil-color-primary)",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);

Spinner.displayName = "Spinner";

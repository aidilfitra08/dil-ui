import { forwardRef } from "react";

import type { CounterProps } from "./Counter.types";
import { cn } from "../../../lib/utils";

export const Counter = forwardRef<HTMLOutputElement, CounterProps>(
  ({ className, prefix = "", suffix = "", value, ...props }, ref) => (
    <output
      ref={ref}
      className={cn(
        "inline-flex",
        "items-baseline",
        "gap-1",
        "font-semibold",
        "text-(length:--dil-font-xl)",
        "text-(--dil-color-text)",
        className,
      )}
      {...props}
    >
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </output>
  ),
);

Counter.displayName = "Counter";

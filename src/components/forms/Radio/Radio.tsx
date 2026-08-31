import { forwardRef } from "react";

import type { RadioProps } from "./Radio.types";
import { cn } from "../../../lib/utils";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="radio"
      className={cn(
        "size-4",
        "accent-[var(--dil-color-primary)]",
        "outline-none",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-[var(--dil-color-primary)]",
        className,
      )}
      {...props}
    />
  ),
);

Radio.displayName = "Radio";

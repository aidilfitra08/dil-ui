import { forwardRef } from "react";

import type { CheckboxProps } from "./Checkbox.types";
import { cn } from "../../../lib/utils";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
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

Checkbox.displayName = "Checkbox";

import { forwardRef } from "react";

import type { MultiSelectProps } from "./MultiSelect.types";
import { cn } from "../../../lib/utils";

// TODO: Replace this native placeholder with a searchable, chip-based multi-select experience.
export const MultiSelect = forwardRef<HTMLSelectElement, MultiSelectProps>(
  ({ className, options = [], children, ...props }, ref) => (
    <select
      ref={ref}
      multiple
      className={cn(
        "min-h-24",
        "w-full",
        "rounded-(--dil-radius-md)",
        "border",
        "border-(--dil-color-border)",
        "bg-(--dil-color-surface)",
        "p-2",
        "text-(--dil-font-md)",
        "text-(--dil-color-text)",
        "outline-none",
        "focus:border-(--dil-color-primary)",
        className,
      )}
      {...props}
    >
      {children ??
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
    </select>
  ),
);

MultiSelect.displayName = "MultiSelect";

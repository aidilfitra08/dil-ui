import { forwardRef } from "react";

import type { SelectProps } from "./Select.types";
import { cn } from "../../../lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options = [], children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-10",
        "w-full",
        "rounded-(--dil-radius-md)",
        "border",
        "border-(--dil-color-border)",
        "bg-(--dil-color-surface)",
        "px-3",
        "text-(length:--dil-font-md)",
        "text-(--dil-color-text)",
        "outline-none",
        "focus:border-(--dil-color-primary)",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
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

Select.displayName = "Select";

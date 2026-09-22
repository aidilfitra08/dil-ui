import { forwardRef } from "react";

import type { SwitchProps } from "./Switch.types";
import { cn } from "../../../lib/utils";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      role="switch"
      className={cn(
        "h-6",
        "w-11",
        "cursor-pointer",
        "appearance-none",
        "rounded-full",
        "border",
        "border-(--dil-color-border)",
        "bg-(--dil-color-surface)",
        "p-[3.5px]",
        "transition-colors",
        "before:block",
        "before:size-4",
        "before:rounded-full",
        "before:bg-(--dil-color-text)",
        "before:transition-transform",
        "checked:bg-(--dil-color-primary)",
        "checked:before:translate-x-5",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-(--dil-color-primary)",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

Switch.displayName = "Switch";

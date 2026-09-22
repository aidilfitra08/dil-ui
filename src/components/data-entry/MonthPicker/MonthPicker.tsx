import { forwardRef } from "react";

import type { MonthPickerProps } from "./MonthPicker.types";
import { cn } from "../../../lib/utils";

export const MonthPicker = forwardRef<HTMLInputElement, MonthPickerProps>(
  ({ allowTextInput = true, className, onClick, onKeyDown, ...props }, ref) => (
    <input
      ref={ref}
      type="month"
      inputMode={allowTextInput ? props.inputMode : "none"}
      className={cn(
        "h-10",
        "w-full",
        "rounded-(--dil-radius-md)",
        "border",
        "border-(--dil-color-border)",
        "bg-(--dil-color-surface)",
        "px-3",
        "text-(--dil-font-md)",
        "text-(--dil-color-text)",
        "outline-none",
        "focus:border-(--dil-color-primary)",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!allowTextInput) event.currentTarget.showPicker?.();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!allowTextInput) event.preventDefault();
      }}
      {...props}
    />
  ),
);

MonthPicker.displayName = "MonthPicker";

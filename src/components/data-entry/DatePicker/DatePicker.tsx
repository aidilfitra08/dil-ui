import { forwardRef } from "react";

import type { DatePickerProps } from "./DatePicker.types";
import { cn } from "../../../lib/utils";

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ allowTextInput = true, className, onClick, onKeyDown, ...props }, ref) => {
    const classes = cn(
      "h-10",
      "w-full",
      "rounded-[var(--dil-radius-md)]",
      "border",
      "border-[var(--dil-color-border)]",
      "bg-[var(--dil-color-surface)]",
      "px-3",
      "text-[var(--dil-font-md)]",
      "text-[var(--dil-color-text)]",
      "outline-none",
      "focus:border-[var(--dil-color-primary)]",
      className,
    );

    return (
      <input
        ref={ref}
        type="date"
        className={classes}
        inputMode={allowTextInput ? props.inputMode : "none"}
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
    );
  },
);

DatePicker.displayName = "DatePicker";

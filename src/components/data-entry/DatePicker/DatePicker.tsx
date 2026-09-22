import { forwardRef } from "react";

import type { DatePickerProps } from "./DatePicker.types";
import { cn } from "../../../lib/utils";
import { Calendar } from "../../../icons";

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
      "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
      "[&::-webkit-calendar-picker-indicator]:opacity-0",
      className,
    );

    return (
      <div className="relative">
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
        <Calendar
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

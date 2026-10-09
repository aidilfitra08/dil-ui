import { forwardRef, useState } from "react";

import type { DatePickerProps } from "./DatePicker.types";
import { cn } from "../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/Popover";
import { CalendarPanel } from "../picker-panels";

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ allowTextInput = true, className, onClick, onKeyDown, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(() =>
      String(props.value ?? props.defaultValue ?? ""),
    );
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
      "dil-date-input",
      className,
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <input
              ref={ref}
              type="date"
              className={classes}
              inputMode={allowTextInput ? props.inputMode : "none"}
              onPointerDown={(event) => event.preventDefault()}
              value={props.value ?? selectedValue}
              onClick={onClick}
              onKeyDown={(event) => {
                onKeyDown?.(event);
                if (!allowTextInput) event.preventDefault();
              }}
              {...props}
              onChange={(event) => {
                setSelectedValue(event.target.value);
                props.onChange?.(event);
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-3" side="bottom" align="start">
          <CalendarPanel
            value={String(props.value ?? selectedValue)}
            onChange={(value) => {
              setSelectedValue(value);
              const event = {
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>;
              props.onChange?.(event);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DatePicker.displayName = "DatePicker";

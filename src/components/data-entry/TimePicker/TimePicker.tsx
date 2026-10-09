import { forwardRef, useState } from "react";

import type { TimePickerProps } from "./TimePicker.types";
import { cn } from "../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/Popover";
import { TimePanel } from "../picker-panels";

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ allowTextInput = true, className, onClick, onKeyDown, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(() =>
      String(props.value ?? props.defaultValue ?? ""),
    );
    const input = (
      <input
        ref={ref}
        type="time"
        inputMode={allowTextInput ? props.inputMode : "none"}
        onPointerDown={(event) => event.preventDefault()}
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
          "dil-date-input",
          className,
        )}
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
    );
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{input}</PopoverTrigger>
        <PopoverContent className="p-3" side="bottom" align="start">
          <TimePanel
            value={String(props.value ?? selectedValue)}
            onChange={(value) => {
              setSelectedValue(value);
              props.onChange?.({
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

TimePicker.displayName = "TimePicker";

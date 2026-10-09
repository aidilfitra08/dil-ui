import { forwardRef, useState } from "react";

import type {
  TimeRangePickerProps,
  TimeRangeValue,
} from "./TimeRangePicker.types";
import { cn } from "../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/Popover";
import { TimePanel } from "../picker-panels";

export const TimeRangePicker = forwardRef<HTMLDivElement, TimeRangePickerProps>(
  (
    {
      className,
      defaultValue,
      onChange,
      placeholder = "Select time range",
      value,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<TimeRangeValue>(
      defaultValue ?? {},
    );
    const selectedValue = value ?? internalValue;
    const updateValue = (nextValue: TimeRangeValue) => {
      if (value === undefined) setInternalValue(nextValue);
      onChange?.(nextValue);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div
          ref={ref}
          className={cn("relative", "w-full", className)}
          {...props}
        >
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex h-10 w-full items-center rounded-(--dil-radius-md) border border-(--dil-color-border) bg-(--dil-color-surface) px-3 text-left text-(length:--dil-font-md) text-(--dil-color-text)"
            >
              {selectedValue.start
                ? `${selectedValue.start} - ${selectedValue.end ?? ""}`
                : placeholder}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-72 space-y-3 p-3"
            side="bottom"
            align="start"
          >
            <p className="text-sm font-medium">Start time</p>
            <TimePanel
              value={selectedValue.start}
              onChange={(start) => updateValue({ ...selectedValue, start })}
            />
            <p className="text-sm font-medium">End time</p>
            <TimePanel
              value={selectedValue.end}
              onChange={(end) => updateValue({ ...selectedValue, end })}
            />
            <button
              type="button"
              className="w-full border border-(--dil-color-border) px-3 py-2"
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </PopoverContent>
        </div>
      </Popover>
    );
  },
);

TimeRangePicker.displayName = "TimeRangePicker";

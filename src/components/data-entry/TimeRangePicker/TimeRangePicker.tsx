import { forwardRef, useState } from "react";

import type {
  TimeRangePickerProps,
  TimeRangeValue,
} from "./TimeRangePicker.types";
import { cn } from "../../../lib/utils";

const timeInputClasses =
  "h-10 w-full rounded-[var(--dil-radius-md)] border border-[var(--dil-color-border)] bg-[var(--dil-color-surface)] px-3 text-[var(--dil-font-md)] text-[var(--dil-color-text)]";

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
    const [internalValue, setInternalValue] = useState<TimeRangeValue>(
      defaultValue ?? {},
    );
    const [isOpen, setIsOpen] = useState(false);
    const selectedValue = value ?? internalValue;
    const updateValue = (nextValue: TimeRangeValue) => {
      if (value === undefined) setInternalValue(nextValue);
      onChange?.(nextValue);
    };

    return (
      <div ref={ref} className={cn("relative", "w-full", className)} {...props}>
        <button
          type="button"
          className="flex h-10 w-full items-center rounded-[var(--dil-radius-md)] border border-[var(--dil-color-border)] bg-[var(--dil-color-surface)] px-3 text-left text-[var(--dil-font-md)] text-[var(--dil-color-text)]"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {selectedValue.start
            ? `${selectedValue.start} - ${selectedValue.end ?? ""}`
            : placeholder}
        </button>
        {isOpen ? (
          <div className="absolute z-20 mt-2 w-72 space-y-3 border border-[var(--dil-color-border)] bg-[var(--dil-color-surface)] p-3 shadow-[var(--dil-shadow-md)]">
            <label className="block text-[var(--dil-font-sm)]">
              Start
              <input
                className={cn("mt-1", timeInputClasses)}
                type="time"
                value={selectedValue.start ?? ""}
                onChange={(event) =>
                  updateValue({ ...selectedValue, start: event.target.value })
                }
              />
            </label>
            <label className="block text-[var(--dil-font-sm)]">
              End
              <input
                className={cn("mt-1", timeInputClasses)}
                type="time"
                value={selectedValue.end ?? ""}
                onChange={(event) =>
                  updateValue({ ...selectedValue, end: event.target.value })
                }
              />
            </label>
            <button
              type="button"
              className="w-full border border-[var(--dil-color-border)] px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              Done
            </button>
          </div>
        ) : null}
      </div>
    );
  },
);

TimeRangePicker.displayName = "TimeRangePicker";

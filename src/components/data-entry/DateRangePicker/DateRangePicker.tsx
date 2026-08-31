import { forwardRef, useState } from "react";

import type {
  DateRangePickerProps,
  DateRangeValue,
} from "./DateRangePicker.types";
import { cn } from "../../../lib/utils";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getMonthDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();

  return Array.from({ length: startOffset + daysInMonth }, (_, index) =>
    index < startOffset
      ? undefined
      : new Date(
          month.getFullYear(),
          month.getMonth(),
          index - startOffset + 1,
        ),
  );
}

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      className,
      defaultValue,
      formatValue,
      onChange,
      placeholder = "Select date range",
      value,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<DateRangeValue>(
      defaultValue ?? {},
    );
    const [isOpen, setIsOpen] = useState(false);
    const [visibleMonth, setVisibleMonth] = useState(() => new Date());
    const selectedValue = value ?? internalValue;
    const monthDays = getMonthDays(visibleMonth);
    const displayValue =
      formatValue?.(selectedValue) ??
      (selectedValue.start
        ? `${selectedValue.start} - ${selectedValue.end ?? ""}`
        : "");

    const selectDate = (date: Date) => {
      const nextDate = toDateValue(date);
      const nextValue: DateRangeValue =
        !selectedValue.start ||
        selectedValue.end ||
        nextDate < selectedValue.start
          ? { start: nextDate }
          : { start: selectedValue.start, end: nextDate };

      if (value === undefined) setInternalValue(nextValue);
      onChange?.(nextValue);
      if (nextValue.end) setIsOpen(false);
    };

    return (
      <div ref={ref} className={cn("relative", "w-full", className)} {...props}>
        <button
          type="button"
          className="flex h-10 w-full items-center rounded-[var(--dil-radius-md)] border border-[var(--dil-color-border)] bg-[var(--dil-color-surface)] px-3 text-left text-[var(--dil-font-md)] text-[var(--dil-color-text)]"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {displayValue || placeholder}
        </button>
        {isOpen ? (
          <div className="absolute z-20 mt-2 w-72 border border-[var(--dil-color-border)] bg-[var(--dil-color-surface)] p-3 shadow-[var(--dil-shadow-md)]">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setVisibleMonth(
                    (month) =>
                      new Date(month.getFullYear(), month.getMonth() - 1, 1),
                  )
                }
              >
                Previous
              </button>
              <span className="font-medium">
                {visibleMonth.toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={() =>
                  setVisibleMonth(
                    (month) =>
                      new Date(month.getFullYear(), month.getMonth() + 1, 1),
                  )
                }
              >
                Next
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[var(--dil-font-xs)]">
              {weekdays.map((day) => (
                <span key={day}>{day}</span>
              ))}
              {monthDays.map((date, index) =>
                date ? (
                  <button
                    key={toDateValue(date)}
                    type="button"
                    className={cn(
                      "aspect-square rounded-[var(--dil-radius-xs)]",
                      toDateValue(date) === selectedValue.start ||
                        toDateValue(date) === selectedValue.end
                        ? "bg-[var(--dil-color-primary)]"
                        : "hover:bg-[var(--dil-color-secondary)]",
                    )}
                    onClick={() => selectDate(date)}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <span key={`empty-${index}`} />
                ),
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";

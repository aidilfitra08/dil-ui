import { forwardRef, useState } from "react";

import type {
  DateRangePickerProps,
  DateRangeValue,
} from "./DateRangePicker.types";
import { cn } from "../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/Popover";
import { MonthPanel, YearPanel } from "../picker-panels";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getMonthDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = firstDay.getDay();
  return Array.from(
    { length: 35 },
    (_, index) =>
      new Date(month.getFullYear(), month.getMonth(), index - startOffset + 1),
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
    const [view, setView] = useState<"date" | "month" | "year">("date");
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
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div ref={ref} className="relative w-full" {...props}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-10 w-full items-center rounded-(--dil-radius-md) border border-(--dil-color-border) bg-(--dil-color-surface) px-3 text-left text-(length:--dil-font-md) text-(--dil-color-text)",
                className,
              )}
              aria-expanded={isOpen}
            >
              {displayValue || placeholder}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-72 p-3 text-(--dil-color-text)"
            side="bottom"
            align="start"
          >
            {view === "year" ? (
              <YearPanel
                value={visibleMonth.getFullYear()}
                onChange={(year) => {
                  setVisibleMonth(new Date(year, visibleMonth.getMonth(), 1));
                  setView("date");
                }}
              />
            ) : view === "month" ? (
              <MonthPanel
                value={`${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, "0")}`}
                onChange={(month) => {
                  const [year, selectedMonth] = month.split("-").map(Number);
                  setVisibleMonth(new Date(year, selectedMonth - 1, 1));
                  setView("date");
                }}
              />
            ) : (
              <>
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
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setView("month")}>
                      {visibleMonth.toLocaleDateString(undefined, {
                        month: "long",
                      })}
                    </button>
                    <button type="button" onClick={() => setView("year")}>
                      {visibleMonth.getFullYear()}
                    </button>
                  </div>
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
                <div className="grid grid-cols-7 gap-y-1 text-center text-(--dil-font-xs)">
                  {weekdays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                  {monthDays.map((date) => {
                    const dateValue = toDateValue(date);
                    const isCurrentMonth =
                      date.getMonth() === visibleMonth.getMonth() &&
                      date.getFullYear() === visibleMonth.getFullYear();
                    const isSelected =
                      dateValue === selectedValue.start ||
                      dateValue === selectedValue.end;
                    const isInRange =
                      selectedValue.start &&
                      selectedValue.end &&
                      dateValue > selectedValue.start &&
                      dateValue < selectedValue.end;

                    return (
                      <button
                        key={dateValue}
                        type="button"
                        className={cn(
                          "aspect-square focus-visible:outline-2 focus-visible:outline-(--dil-color-text)",
                          !isCurrentMonth && "text-(--dil-color-muted)",
                          dateValue === selectedValue.start
                            ? "rounded-l-(--dil-radius-sm)"
                            : "",
                          dateValue === selectedValue.end
                            ? "rounded-r-(--dil-radius-sm)"
                            : "",
                          isSelected
                            ? "bg-(--dil-color-primary) text-(--dil-color-primary-foreground)"
                            : isInRange
                              ? "bg-(--dil-color-muted) text-(--dil-color-muted-foreground)"
                              : "hover:bg-(--dil-color-secondary) hover:text-(--dil-color-secondary-foreground)",
                        )}
                        onClick={() => selectDate(date)}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </PopoverContent>
        </div>
      </Popover>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";

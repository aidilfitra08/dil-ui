import { forwardRef, useEffect, useRef, useState } from "react";

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
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const rootRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const selectedValue = value ?? internalValue;
    const monthDays = getMonthDays(visibleMonth);

    useEffect(() => {
      if (!isOpen) return;

      const updatePopupPosition = () => {
        const trigger = rootRef.current?.querySelector("button");
        const popup = popupRef.current;
        if (!trigger || !popup) return;

        const triggerRect = trigger.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const gap = 8;
        const fitsBelow =
          triggerRect.bottom + gap + popupRect.height <= window.innerHeight;
        const top = fitsBelow
          ? triggerRect.bottom + gap
          : Math.max(gap, triggerRect.top - popupRect.height - gap);
        const left = Math.min(
          Math.max(gap, triggerRect.left),
          window.innerWidth - popupRect.width - gap,
        );

        setPopupPosition({ top, left });
      };

      updatePopupPosition();
      window.addEventListener("resize", updatePopupPosition);
      window.addEventListener("scroll", updatePopupPosition, true);

      const handleOutsidePointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        if (
          !rootRef.current?.contains(target) &&
          !popupRef.current?.contains(target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("pointerdown", handleOutsidePointerDown);

      return () => {
        window.removeEventListener("resize", updatePopupPosition);
        window.removeEventListener("scroll", updatePopupPosition, true);
        document.removeEventListener("pointerdown", handleOutsidePointerDown);
      };
    }, [isOpen]);
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
      if (nextValue.end) setTimeout(() => setIsOpen(false), 50);
    };

    return (
      <div
        ref={(element) => {
          rootRef.current = element;
          if (typeof ref === "function") ref(element);
          else if (ref) ref.current = element;
        }}
        className={cn("relative", "w-full", className)}
        {...props}
      >
        <button
          type="button"
          className="flex h-10 w-full items-center rounded-(--dil-radius-md) border border-(--dil-color-border) bg-(--dil-color-surface) px-3 text-left text-(length:--dil-font-md) text-(--dil-color-text)"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {displayValue || placeholder}
        </button>
        {isOpen ? (
          <div
            ref={popupRef}
            className="fixed z-20 w-72 border border-(--dil-color-border) bg-(--dil-color-surface) p-3 shadow-(--dil-shadow-md) text-(--dil-color-text)"
            style={popupPosition}
          >
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
                      "aspect-square",
                      !isCurrentMonth && "text-(--dil-color-muted)",
                      dateValue === selectedValue.start
                        ? "rounded-l-(--dil-radius-sm)"
                        : "",
                      dateValue === selectedValue.end
                        ? "rounded-r-(--dil-radius-sm)"
                        : "",
                      isSelected
                        ? "bg-(--dil-color-primary)"
                        : isInRange
                          ? "bg-(--dil-color-muted)"
                          : "hover:bg-(--dil-color-secondary)",
                    )}
                    onClick={() => selectDate(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";

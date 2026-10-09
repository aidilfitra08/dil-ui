import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function monthDays(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  return Array.from(
    { length: 35 },
    (_, index) =>
      new Date(
        month.getFullYear(),
        month.getMonth(),
        index - first.getDay() + 1,
      ),
  );
}

const pickerButtonClass =
  "rounded-(--dil-radius-sm) border border-transparent px-2 py-1 text-(--dil-color-text) transition-colors hover:border-(--dil-color-border) hover:bg-(--dil-color-secondary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary) cursor-pointer";

export function YearPanel({
  value,
  onChange,
}: {
  value: number;
  onChange: (year: number) => void;
}) {
  const [startYear, setStartYear] = useState(value - (value % 12));
  const years = Array.from({ length: 12 }, (_, index) => startYear + index);

  return (
    <div className="w-[min(20rem,calc(100vw-2rem))] text-(--dil-color-text)">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          className={pickerButtonClass}
          onClick={() => setStartYear((current) => current - 12)}
        >
          Previous
        </button>
        <strong>{`${years[0]}–${years[years.length - 1]}`}</strong>
        <button
          type="button"
          className={pickerButtonClass}
          onClick={() => setStartYear((current) => current + 12)}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            aria-pressed={year === value}
            className={cn(
              "rounded-(--dil-radius-sm) border border-transparent px-2 py-2 text-(--dil-color-text) hover:border-(--dil-color-border) hover:bg-(--dil-color-secondary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary) cursor-pointer",
              year === value &&
                "border-(--dil-color-border) bg-(--dil-color-primary)",
            )}
            onClick={() => onChange(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CalendarPanel({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const initialMonth = value ? new Date(`${value}T00:00:00`) : new Date();
  const [month, setMonth] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );
  const [view, setView] = useState<"date" | "month" | "year">("date");
  const days = useMemo(() => monthDays(month), [month]);

  if (view === "year") {
    return (
      <YearPanel
        value={month.getFullYear()}
        onChange={(year) => {
          setMonth(new Date(year, month.getMonth(), 1));
          setView("date");
        }}
      />
    );
  }

  if (view === "month") {
    return (
      <MonthPanel
        value={`${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`}
        onChange={(value) => {
          const [year, selectedMonth] = value.split("-").map(Number);
          setMonth(new Date(year, selectedMonth - 1, 1));
          setView("date");
        }}
      />
    );
  }

  return (
    <div className="w-[min(20rem,calc(100vw-2rem))] text-(--dil-color-text)">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          className={pickerButtonClass}
          onClick={() =>
            setMonth(
              (current) =>
                new Date(current.getFullYear(), current.getMonth() - 1, 1),
            )
          }
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={pickerButtonClass}
            onClick={() => setView("month")}
          >
            {month.toLocaleDateString(undefined, { month: "long" })}
          </button>
          <button
            type="button"
            className={pickerButtonClass}
            onClick={() => setView("year")}
          >
            {month.getFullYear()}
          </button>
        </div>
        <button
          type="button"
          className={pickerButtonClass}
          onClick={() =>
            setMonth(
              (current) =>
                new Date(current.getFullYear(), current.getMonth() + 1, 1),
            )
          }
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {weekdays.map((day) => (
          <span
            key={day}
            className="py-1 font-semibold text-(--dil-color-muted)"
          >
            {day}
          </span>
        ))}
        {days.map((day) => {
          const key = dateKey(day);
          const currentMonth = day.getMonth() === month.getMonth();
          return (
            <button
              key={key}
              type="button"
              aria-pressed={key === value}
              className={cn(
                "aspect-square rounded-(--dil-radius-sm) border border-transparent text-(--dil-color-text) transition-colors hover:border-(--dil-color-border) hover:bg-(--dil-color-secondary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary) cursor-pointer",
                !currentMonth && "text-(--dil-color-muted) opacity-60",
                key === value &&
                  "border-(--dil-color-border) bg-(--dil-color-primary) text-(--dil-color-text) hover:bg-(--dil-color-primary)",
              )}
              onClick={() => onChange(key)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MonthPanel({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const selected = value ? new Date(`${value}-01T00:00:00`) : new Date();
  const [year, setYear] = useState(selected.getFullYear());
  const [view, setView] = useState<"month" | "year">("month");

  if (view === "year") {
    return (
      <YearPanel
        value={year}
        onChange={(nextYear) => {
          setYear(nextYear);
          setView("month");
        }}
      />
    );
  }

  return (
    <div className="w-[min(20rem,calc(100vw-2rem))] text-(--dil-color-text)">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          className="rounded-(--dil-radius-sm) border border-transparent px-2 py-1 text-(--dil-color-text) hover:border-(--dil-color-border) hover:bg-(--dil-color-secondary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary)"
          onClick={() => setYear((current) => current - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className={pickerButtonClass}
          onClick={() => setView("year")}
        >
          {year}
        </button>
        <button
          type="button"
          className="rounded-(--dil-radius-sm) border border-transparent px-2 py-1 text-(--dil-color-text) hover:border-(--dil-color-border) hover:bg-(--dil-color-secondary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary)"
          onClick={() => setYear((current) => current + 1)}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }, (_, index) => {
          const month = String(index + 1).padStart(2, "0");
          const key = `${year}-${month}`;
          return (
            <button
              type="button"
              aria-pressed={key === value}
              key={key}
              className={cn(
                "rounded-(--dil-radius-sm) border border-transparent px-2 py-2 text-(--dil-color-text) hover:border-(--dil-color-border) hover:bg-(--dil-color-secondary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary) cursor-pointer",
                key === value &&
                  "border-(--dil-color-border) bg-(--dil-color-primary)",
              )}
              onClick={() => onChange(key)}
            >
              {new Date(year, index, 1).toLocaleDateString(undefined, {
                month: "short",
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const hours = Array.from({ length: 24 }, (_, index) =>
  String(index).padStart(2, "0"),
);
const minutes = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, "0"),
);

export function TimePanel({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const [selectedHour = "00", selectedMinute = "00"] = (value ?? "").split(":");
  const selectTime = (hour: string, minute: string) =>
    onChange(`${hour}:${minute}`);
  const buttonClass =
    "w-full rounded-(--dil-radius-sm) border border-transparent px-3 py-2 text-sm text-(--dil-color-text) hover:border-(--dil-color-border) hover:bg-(--dil-color-secondary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary) cursor-pointer";

  return (
    <div className="grid w-[min(16rem,calc(100vw-2rem))] grid-cols-2 gap-2 text-(--dil-color-text)">
      <div>
        <div className="mb-1 text-center text-xs font-semibold text-(--dil-color-muted)">
          Hour
        </div>
        <div
          aria-label="Select hour"
          className="grid max-h-64 gap-1 overflow-y-auto pr-1"
        >
          {hours.map((hour) => (
            <button
              type="button"
              aria-pressed={hour === selectedHour}
              key={hour}
              className={cn(
                buttonClass,
                hour === selectedHour &&
                  "border-(--dil-color-border) bg-(--dil-color-primary)",
              )}
              onClick={() => selectTime(hour, selectedMinute)}
            >
              {hour}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 text-center text-xs font-semibold text-(--dil-color-muted)">
          Minute
        </div>
        <div
          aria-label="Select minute"
          className="grid max-h-64 gap-1 overflow-y-auto pr-1"
        >
          {minutes.map((minute) => (
            <button
              type="button"
              aria-pressed={minute === selectedMinute}
              key={minute}
              className={cn(
                buttonClass,
                minute === selectedMinute &&
                  "border-(--dil-color-border) bg-(--dil-color-primary)",
              )}
              onClick={() => selectTime(selectedHour, minute)}
            >
              {minute}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

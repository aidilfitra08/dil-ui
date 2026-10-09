import { forwardRef, useMemo, useState } from "react";

import type { MultiSelectProps } from "./MultiSelect.types";
import { cn } from "../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/Popover";

export const MultiSelect = forwardRef<HTMLSelectElement, MultiSelectProps>(
  (
    {
      className,
      options = [],
      children,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const optionList = options.length ? options : ["Option 1", "Option 2"];
    const initialValue = Array.isArray(defaultValue)
      ? defaultValue.map(String)
      : [];
    const [internalValue, setInternalValue] = useState<string[]>(initialValue);
    const selected = Array.isArray(value) ? value.map(String) : internalValue;
    const label = useMemo(
      () => (selected.length ? selected : ["Select options"]),
      [selected],
    );

    const toggleOption = (option: string) => {
      const next = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      if (value === undefined) setInternalValue(next);
      onChange?.({
        target: { value: next.join(",") },
      } as React.ChangeEvent<HTMLSelectElement>);
    };

    return (
      <Popover>
        <select
          ref={ref}
          multiple
          value={selected}
          onChange={onChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          {...props}
        >
          {optionList.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "min-h-10 w-full rounded-(--dil-radius-md) border border-(--dil-color-border) bg-(--dil-color-surface) px-3 text-left text-(--dil-color-text) outline-none focus:border-(--dil-color-primary)",
              className,
            )}
          >
            <span className="flex flex-wrap gap-1">
              {label.map((item) => (
                <span
                  key={item}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-sm",
                    item === "Select options"
                      ? "text-(--dil-color-muted)"
                      : "bg-(--dil-color-secondary)",
                  )}
                >
                  {item}
                </span>
              ))}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-2" side="bottom" align="start">
          <div role="listbox" aria-multiselectable="true" className="space-y-1">
            {optionList.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    "w-full cursor-pointer rounded px-3 py-2 text-left transition-colors hover:bg-(--dil-color-secondary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary)",
                    isSelected && "bg-(--dil-color-primary) font-medium",
                  )}
                  onClick={() => toggleOption(option)}
                >
                  {option}
                </button>
              );
            })}
            {children}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";

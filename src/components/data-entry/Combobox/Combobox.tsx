import { forwardRef, useMemo, useState } from "react";

import type { ComboboxProps } from "./Combobox.types";
import { cn } from "../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/Popover";

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    { className, options = [], value, defaultValue, onChange, ...props },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(String(value ?? defaultValue ?? ""));
    const filteredOptions = useMemo(
      () =>
        options.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase()),
        ),
      [options, query],
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
      "placeholder:text-[var(--dil-color-text)]",
      "focus:border-[var(--dil-color-primary)]",
      className,
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <input
            ref={ref}
            className={classes}
            value={value ?? query}
            aria-expanded={open}
            autoComplete="off"
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              onChange?.(event);
              setOpen(true);
            }}
            {...props}
          />
        </PopoverTrigger>
        <PopoverContent className="p-1" side="bottom" align="start">
          <ul role="listbox" className="max-h-56 overflow-auto">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    className="w-full rounded px-3 py-2 text-left hover:bg-(--dil-color-secondary) cursor-pointer"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setQuery(option);
                      setOpen(false);
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm opacity-70">No results</li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    );
  },
);

Combobox.displayName = "Combobox";

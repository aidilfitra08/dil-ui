import { forwardRef, useMemo, useState } from "react";

import type { ComboboxProps } from "./Combobox.types";
import { cn } from "../../../lib/utils";
import { Popover, PopoverAnchor, PopoverContent } from "../../overlay/Popover";
import { ComboboxItem } from "./ComboboxItem";

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
        <PopoverAnchor asChild>
          <input
            ref={ref}
            className={classes}
            value={value ?? query}
            aria-expanded={open}
            autoComplete="off"
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              onChange?.(event);
              setOpen(true);
            }}
            {...props}
          />
        </PopoverAnchor>
        <PopoverContent className="p-1" side="bottom" align="start">
          <ul
            role="listbox"
            className="max-h-56 overflow-auto [&>li:first-child>button]:rounded-t-(--dil-radius-lg) [&>li:last-child>button]:rounded-b-(--dil-radius-lg)"
          >
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <li key={option} className="" role="option">
                  <ComboboxItem
                    className="hover:translate-y-0 active:translate-y-0"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setQuery(option);
                      setOpen(false);
                    }}
                  >
                    {option}
                  </ComboboxItem>
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

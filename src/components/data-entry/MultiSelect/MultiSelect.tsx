import { forwardRef, useMemo, useState } from "react";

import type { MultiSelectProps } from "./MultiSelect.types";
import { cn } from "../../../lib/utils";
import { Popover, PopoverAnchor, PopoverContent } from "../../overlay/Popover";
import { MultiSelectItem } from "./MultiSelectItem";

export const MultiSelect = forwardRef<HTMLSelectElement, MultiSelectProps>(
  (
    {
      className,
      options = [],
      searchable,
      children,
      value,
      defaultValue,
      onChange,
      placeholder = "Select options",
      ...props
    },
    ref,
  ) => {
    const optionList = useMemo(
      () => (options.length ? options : ["Option 1", "Option 2"]),
      [options],
    );
    const initialValue = Array.isArray(defaultValue)
      ? defaultValue.map(String)
      : [];
    const [internalValue, setInternalValue] = useState<string[]>(initialValue);
    const selected = Array.isArray(value) ? value.map(String) : internalValue;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const filteredOptions = useMemo(
      () =>
        searchable
          ? optionList.filter((option) =>
              option.toLowerCase().includes(query.toLowerCase()),
            )
          : optionList,
      [optionList, query, searchable],
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
      <Popover open={open} onOpenChange={setOpen}>
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
        <PopoverAnchor asChild>
          <div
            role="group"
            aria-label="Selected options"
            tabIndex={searchable ? undefined : 0}
            className={cn(
              "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-(--dil-radius-md) border border-(--dil-color-border) bg-(--dil-color-surface) px-3 py-2 text-left text-(--dil-color-text) outline-none focus-within:border-(--dil-color-primary)",
              className,
            )}
            onClick={() => setOpen(true)}
            onKeyDown={(event) => {
              if (
                event.target === event.currentTarget &&
                (event.key === "Enter" || event.key === " ")
              ) {
                event.preventDefault();
                setOpen(true);
              }
            }}
          >
            {selected.length ? (
              selected.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-label={`Remove ${item}`}
                  className="inline-flex items-center gap-1 rounded-full bg-(--dil-color-secondary) px-2 py-0.5 text-sm text-(--dil-color-secondary-foreground) hover:bg-(--dil-color-primary) hover:text-(--dil-color-primary-foreground) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary) cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleOption(item);
                  }}
                >
                  {item}
                  <span aria-hidden="true">×</span>
                </button>
              ))
            ) : !searchable ? (
              <span className="text-sm text-(--dil-color-muted)">
                {placeholder}
              </span>
            ) : null}
            {searchable && (
              <input
                type="search"
                aria-label="Search options"
                placeholder={selected.length ? "Search..." : placeholder}
                value={query}
                onFocus={() => setOpen(true)}
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen(true);
                }}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOpen(true);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && !query && selected.length) {
                    toggleOption(selected[selected.length - 1]);
                  }
                  if (event.key === "Escape") setOpen(false);
                }}
                onMouseDown={(event) => event.stopPropagation()}
                className="h-8 min-w-24 flex-1 border-0 bg-transparent px-1 text-sm text-(--dil-color-text) outline-none placeholder:text-(--dil-color-muted)"
              />
            )}
            {!searchable && selected.length === 0 && (
              <span className="sr-only">{placeholder}</span>
            )}
          </div>
        </PopoverAnchor>
        <PopoverContent className="p-1" side="bottom" align="start">
          <div
            role="listbox"
            aria-label="Options"
            aria-multiselectable="true"
            className="max-h-56 space-y-1 overflow-auto [&>button:first-child]:rounded-t-[calc(var(--dil-radius-md)-4px)] [&>button:last-child]:rounded-b-[calc(var(--dil-radius-md)-4px)]"
          >
            {filteredOptions.length ? (
              filteredOptions.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <MultiSelectItem
                    key={option}
                    selected={isSelected}
                    onClick={() => toggleOption(option)}
                  >
                    {option}
                  </MultiSelectItem>
                );
              })
            ) : (
              <div className="px-3 py-2 text-sm opacity-70">No results</div>
            )}
            {children}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";

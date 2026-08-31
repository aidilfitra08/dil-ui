import { forwardRef, useId } from "react";

import type { ComboboxProps } from "./Combobox.types";
import { cn } from "../../../lib/utils";

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  ({ className, options = [], ...props }, ref) => {
    const generatedListId = useId();
    const listId = `dil-combobox-${generatedListId}`;
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
      <>
        <input ref={ref} className={classes} list={listId} {...props} />
        <datalist id={listId}>
          {options.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </>
    );
  },
);

Combobox.displayName = "Combobox";

import { forwardRef } from "react";
import { cn } from "../../../lib/utils";
import type { MultiSelectItemProps } from "./MultiSelectItem.types";

export const MultiSelectItem = forwardRef<
  HTMLButtonElement,
  MultiSelectItemProps
>(({ className, selected = false, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    role="option"
    aria-selected={selected}
    className={cn(
      "inline-flex w-full items-center justify-start gap-2 rounded-none border-2 border-transparent px-3 py-2 text-left font-[var(--dil-font-weight-medium)] text-(--dil-color-text) shadow-none transition-[transform,background-color] duration-150 motion-reduce:transition-none hover:bg-(--dil-color-secondary) hover:text-(--dil-color-secondary-foreground) hover:translate-y-0 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-(--dil-color-text) disabled:pointer-events-none disabled:opacity-50",
      selected && "bg-(--dil-color-primary) text-(--dil-color-primary-foreground)",
      className,
    )}
    {...props}
  />
));

MultiSelectItem.displayName = "MultiSelectItem";

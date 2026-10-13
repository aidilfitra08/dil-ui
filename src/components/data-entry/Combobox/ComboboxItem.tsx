import { forwardRef } from "react";
import { cn } from "../../../lib/utils";
import type { ComboboxItemProps } from "./ComboboxItem.types";

export const ComboboxItem = forwardRef<HTMLButtonElement, ComboboxItemProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex w-full items-center justify-start gap-2 rounded-none border-2 border-transparent px-3 py-2 text-left font-[var(--dil-font-weight-medium)] text-(--dil-color-text) shadow-none transition-[transform,background-color] duration-150 hover:translate-y-0 hover:bg-(--dil-color-secondary) active:translate-y-0 active:bg-(--dil-color-primary) focus-visible:outline-2 focus-visible:outline-(--dil-color-primary) disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

ComboboxItem.displayName = "ComboboxItem";

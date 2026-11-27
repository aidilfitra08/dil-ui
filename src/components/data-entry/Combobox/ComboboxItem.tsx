import { forwardRef } from "react";
import { cn } from "../../../lib/utils";
import type { ComboboxItemProps } from "./ComboboxItem.types";

export const ComboboxItem = forwardRef<HTMLButtonElement, ComboboxItemProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex w-full items-center justify-start gap-2 rounded-none border-2 border-transparent px-3 py-2 text-left font-(--dil-font-weight-medium) text-(--dil-color-text) shadow-none transition-[transform,background-color] duration-150 motion-reduce:transition-none hover:translate-y-0 hover:bg-(--dil-color-secondary) hover:text-(--dil-color-secondary-foreground) active:translate-y-0 active:bg-(--dil-color-primary) active:text-(--dil-color-primary-foreground) focus-visible:outline-2 focus-visible:outline-(--dil-color-text) disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

ComboboxItem.displayName = "ComboboxItem";

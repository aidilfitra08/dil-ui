import { forwardRef } from "react";

import type { TextAreaProps } from "./TextArea.types";
import { cn } from "../../../lib/utils";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-24",
        "w-full",
        "resize-y",
        "rounded-(--dil-radius-md)",
        "border",
        "border-(--dil-color-border)",
        "bg-(--dil-color-surface)",
        "p-3",
        "font-[inherit]",
        "text-(length:--dil-font-md)",
        "text-(--dil-color-text)",
        "outline-none",
        "placeholder:text-(--dil-color-text)",
        "focus:border-(--dil-color-primary)",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

TextArea.displayName = "TextArea";

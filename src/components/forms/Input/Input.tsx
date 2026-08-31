import { forwardRef } from "react";

import type { InputProps } from "./Input.types";
import { cn } from "../../../lib/utils";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-10",
        "w-full",
        "rounded-[var(--dil-radius-md)]",
        "border",
        "border-[var(--dil-color-border)]",
        "bg-[var(--dil-color-surface)]",
        "px-3",
        "text-(length:--dil-font-md)",
        "text-(--dil-color-text)",
        "outline-none",
        "placeholder:text-(--dil-color-text)",
        "focus:border-[var(--dil-color-primary)]",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";

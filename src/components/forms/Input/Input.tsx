import { forwardRef } from "react";

import type { InputProps } from "./Input.types";
import { cn } from "../../../lib/utils";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, id, invalid = false, type = "text", ...props }, ref) => {
    const errorId = errorMessage && id ? `${id}-error` : undefined;

    return (
      <div className="w-full">
        <input
          ref={ref}
          id={id}
          type={type}
          aria-invalid={invalid || Boolean(errorMessage)}
          aria-describedby={errorId}
          className={cn(
            "h-10 w-full rounded-[var(--dil-radius-md)] border bg-[var(--dil-color-surface)] px-3 text-(length:--dil-font-md) text-(--dil-color-text) outline-none placeholder:text-(--dil-color-text)",
            invalid || errorMessage
              ? "border-(--dil-color-danger) focus:border-(--dil-color-danger)"
              : "border-(--dil-color-border) focus:border-(--dil-color-primary)",
            "disabled:cursor-not-allowed disabled:border-(--dil-color-muted) disabled:bg-(--dil-color-muted) disabled:text-(--dil-color-text) disabled:placeholder:text-(--dil-color-text) disabled:opacity-70",
            className,
          )}
          {...props}
        />
        {errorMessage ? (
          <p id={errorId} className="mt-1 text-(length:--dil-font-xs) text-(--dil-color-danger)">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

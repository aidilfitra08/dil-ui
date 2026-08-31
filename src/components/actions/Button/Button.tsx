import { forwardRef } from "react";

import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";
import { cn } from "../../../lib/utils";

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--dil-color-primary)]
    text-(--dil-color-text)
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  secondary: `
    bg-[var(--dil-color-secondary)]
    text-(--dil-color-text)
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  outline: `
    bg-transparent
    text-(--dil-color-text)
    border-[var(--dil-color-border)]
  `,

  ghost: `
    bg-transparent
    text-(--dil-color-text)
    border-transparent
    hover:bg-[var(--dil-color-surface)]
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: `
    min-h-7
    px-2
    text-(length:--dil-font-xs)
    rounded-[var(--dil-radius-xs)]
  `,

  sm: `
    min-h-8
    px-3
    text-(length:--dil-font-sm)
    rounded-[var(--dil-radius-sm)]
  `,

  md: `
    min-h-10
    px-4
    text-(length:--dil-font-md)
    rounded-[var(--dil-radius-md)]
  `,

  lg: `
    min-h-12
    px-6
    text-(length:--dil-font-lg)
    rounded-[var(--dil-radius-lg)]
  `,

  xl: `
    min-h-14
    px-8
    text-(length:--dil-font-xl)
    rounded-[var(--dil-radius-xl)]
  `,

  "2xl": `
    min-h-16
    px-10
    text-(length:--dil-font-2xl)
    rounded-[var(--dil-radius-2xl)]
  `,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref,
  ) => {
    const classes = cn(
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "font-medium",
      "border",
      "cursor-pointer",
      "select-none",

      "transition-[transform,box-shadow,background-color,opacity]",
      "duration-150",

      "hover:-translate-y-px",
      "active:translate-y-px",

      "disabled:pointer-events-none",
      "disabled:opacity-50",

      variantClasses[variant],
      sizeClasses[size],

      className,
    );

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

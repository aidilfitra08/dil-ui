import { forwardRef } from "react";

import type {
  IconButtonProps,
  IconButtonSize,
  IconButtonVariant,
} from "./IconButton.types";
import { cn } from "../../../lib/utils";

const variantClasses: Record<IconButtonVariant, string> = {
  primary: `
    bg-[var(--dil-color-primary)]
    text-[var(--dil-color-text)]
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  secondary: `
    bg-[var(--dil-color-secondary)]
    text-[var(--dil-color-text)]
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  outline: `
    bg-transparent
    text-[var(--dil-color-text)]
    border-[var(--dil-color-border)]
  `,

  ghost: `
    bg-transparent
    text-[var(--dil-color-text)]
    border-transparent
    hover:bg-[var(--dil-color-surface)]
  `,
};

const sizeClasses: Record<IconButtonSize, string> = {
  xs: "size-7 rounded-[var(--dil-radius-xs)] text-[var(--dil-font-xs)]",
  sm: "size-8 rounded-[var(--dil-radius-sm)] text-[var(--dil-font-sm)]",
  md: "size-10 rounded-[var(--dil-radius-md)] text-[var(--dil-font-md)]",
  lg: "size-12 rounded-[var(--dil-radius-lg)] text-[var(--dil-font-lg)]",
  xl: "size-14 rounded-[var(--dil-radius-xl)] text-[var(--dil-font-xl)]",
  "2xl": "size-16 rounded-[var(--dil-radius-2xl)] text-[var(--dil-font-2xl)]",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, variant = "primary", size = "md", className, children, ...props },
    ref,
  ) => {
    const classes = cn(
      "inline-flex",
      "items-center",
      "justify-center",
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
        {icon ?? children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

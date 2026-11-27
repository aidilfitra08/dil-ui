import { forwardRef } from "react";

import type {
  IconButtonProps,
  IconButtonSize,
  IconButtonVariant,
} from "./IconButton.types";
import { cn } from "../../../lib/utils";
import { actionInteractionClasses } from "../actionStyles";

const variantClasses: Record<IconButtonVariant, string> = {
  primary: `
    bg-[var(--dil-color-primary)]
    text-[color:var(--dil-color-primary-foreground,var(--dil-color-text,currentColor))]
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  secondary: `
    bg-[var(--dil-color-secondary)]
    text-[color:var(--dil-color-secondary-foreground,var(--dil-color-text,currentColor))]
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
  xs: "size-7 rounded-[var(--dil-radius-xs)] text-(length:--dil-font-xs)",
  sm: "size-8 rounded-[var(--dil-radius-sm)] text-(length:--dil-font-sm)",
  md: "size-10 rounded-[var(--dil-radius-md)] text-(length:--dil-font-md)",
  lg: "size-12 rounded-[var(--dil-radius-lg)] text-(length:--dil-font-lg)",
  xl: "size-14 rounded-[var(--dil-radius-xl)] text-(length:--dil-font-xl)",
  "2xl": "size-16 rounded-[var(--dil-radius-2xl)] text-(length:--dil-font-2xl)",
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
      actionInteractionClasses,
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

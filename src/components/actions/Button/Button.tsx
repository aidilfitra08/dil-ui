import { forwardRef, type ElementType } from "react";

import type {
  ButtonComponent,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./Button.types";
import { cn } from "../../../lib/utils";
import { actionInteractionClasses } from "../actionStyles";

const variantClasses: Record<ButtonVariant, string> = {
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

  success: `
    bg-[var(--dil-color-success)]
    text-[color:var(--dil-color-success-foreground,var(--dil-color-text,currentColor))]
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  warning: `
    bg-[var(--dil-color-warning)]
    text-[color:var(--dil-color-warning-foreground,var(--dil-color-text,currentColor))]
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  danger: `
    bg-[var(--dil-color-danger)]
    text-[color:var(--dil-color-danger-foreground,var(--dil-color-text,currentColor))]
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  info: `
    bg-[var(--dil-color-info)]
    text-[color:var(--dil-color-info-foreground,var(--dil-color-text,currentColor))]
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  muted: `
    bg-[var(--dil-color-muted)]
    text-[color:var(--dil-color-muted-foreground,var(--dil-color-text,currentColor))]
    border-[var(--dil-color-border)]
    shadow-[var(--dil-shadow-sm)]
  `,

  outline: `
    bg-transparent
    hover:bg-(--dil-color-text)/5
    text-(--dil-color-text)
    border-[var(--dil-color-border)]
  `,

  ghost: `
    bg-transparent
    text-(--dil-color-text)
    border-transparent
    hover:bg-[var(--dil-color-surface)]
  `,

  terminal: `
    group
    relative
    gap-0
    border-transparent
    bg-transparent
    text-(--dil-color-text)
    shadow-none
    motion-safe:hover:translate-y-0
    motion-safe:active:translate-y-0
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

const ButtonBase = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      as: component,
      variant = "primary",
      size = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = component ?? ("button" as ElementType);

    const classes = cn(
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "font-[var(--dil-font-weight-medium)]",
      "border-2",
      "cursor-pointer",
      "select-none",

      actionInteractionClasses,

      variantClasses[variant],
      sizeClasses[size],

      className,
    );

    const content =
      variant === "terminal" ? (
        <>
          <span
            aria-hidden="true"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none text-(--dil-color-danger)"
          >
            [
          </span>
          <span className="mx-1">{children}</span>
          <span
            aria-hidden="true"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none text-(--dil-color-danger)"
          >
            ]
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-0.5 w-0 bg-(--dil-color-terminal) transition-all duration-300 group-hover:w-full group-focus-visible:w-full motion-reduce:transition-none"
          />
        </>
      ) : (
        children
      );

    return (
      <Component ref={ref} className={classes} {...props}>
        {content}
      </Component>
    );
  },
);

ButtonBase.displayName = "Button";

export const Button = ButtonBase as ButtonComponent;

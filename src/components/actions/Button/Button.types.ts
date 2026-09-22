import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted"
  | "outline"
  | "ghost"
  | "terminal";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps | "as">;

export type ButtonComponent = <T extends ElementType = "button">(
  props: ButtonProps<T> & { ref?: ComponentPropsWithRef<T>["ref"] },
) => ReactElement | null;

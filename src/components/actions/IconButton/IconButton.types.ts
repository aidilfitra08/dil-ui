import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

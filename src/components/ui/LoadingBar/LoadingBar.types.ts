import type { HTMLAttributes } from "react";

export type LoadingBarVariant = "primary" | "secondary" | "success" | "info";

export interface LoadingBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  variant?: LoadingBarVariant;
  label?: string;
}

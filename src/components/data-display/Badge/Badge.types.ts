import type { HTMLAttributes } from "react";

export type BadgeVariant = "primary" | "secondary" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

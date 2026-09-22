import type { HTMLAttributes, ReactNode } from "react";

export type SkeletonVariant = "text" | "circle" | "rect";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional content to measure and mirror while loading. */
  children?: ReactNode;
  variant?: SkeletonVariant;
  loading?: boolean;
}

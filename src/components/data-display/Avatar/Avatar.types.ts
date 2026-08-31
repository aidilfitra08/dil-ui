import type { HTMLAttributes, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  alt?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  src?: string;
}

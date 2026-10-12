import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";

export type ListType = "unordered" | "ordered";

export type ListMarker =
  | "default"
  | "none"
  | "disc"
  | "circle"
  | "square"
  | "decimal"
  | "lower-alpha"
  | "upper-alpha"
  | "lower-roman"
  | "upper-roman"
  | "custom";

export type ListSpacing = "none" | "sm" | "md" | "lg";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  type?: ListType;
  marker?: ListMarker;
  renderMarker?: (index: number) => ReactNode;
  spacing?: ListSpacing;
  start?: number;
  reversed?: boolean;
}

export type ListItemProps = LiHTMLAttributes<HTMLLIElement>;

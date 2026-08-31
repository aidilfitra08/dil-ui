import type { LiHTMLAttributes, OlHTMLAttributes, ReactNode } from "react";

export interface TimelineProps extends OlHTMLAttributes<HTMLOListElement> {}

export interface TimelineItemProps extends LiHTMLAttributes<HTMLLIElement> {
  marker?: ReactNode;
}

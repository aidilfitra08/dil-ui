import type { LiHTMLAttributes, OlHTMLAttributes, ReactNode } from "react";

export type TimelineOrientation = "vertical" | "horizontal";
export type TimelineVariant = "stepper" | "activity";
export type TimelineItemStatus = "completed" | "active" | "queued" | "default";

export interface TimelineProps extends OlHTMLAttributes<HTMLOListElement> {
  orientation?: TimelineOrientation;
  variant?: TimelineVariant;
  connector?: boolean;
}

export interface TimelineItemProps extends Omit<
  LiHTMLAttributes<HTMLLIElement>,
  "title"
> {
  marker?: ReactNode;
  status?: TimelineItemStatus;
  title?: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
  card?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  actions?: ReactNode;
  progress?: number;
}

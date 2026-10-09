import type { LiHTMLAttributes, OlHTMLAttributes, ReactNode } from "react";

export interface TimelineProps extends OlHTMLAttributes<HTMLOListElement> {
  variant?: "stepper" | "activity";
  connector?: boolean;
}

export type TimelineItemStatus = "completed" | "active" | "queued" | "default";

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

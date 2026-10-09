import { forwardRef } from "react";

import type { TimelineItemProps, TimelineProps } from "./Timeline.types";
import { cn } from "../../../lib/utils";

const statusStyles = {
  completed: {
    marker: "bg-(--dil-color-primary)",
    card: "bg-(--dil-color-surface)",
    badge: "bg-(--dil-color-primary)",
  },
  active: {
    marker: "bg-(--dil-color-info)",
    card: "bg-(--dil-color-surface)",
    badge: "bg-(--dil-color-primary)",
  },
  queued: {
    marker: "bg-(--dil-color-muted)",
    card: "bg-(--dil-color-muted)",
    badge: "bg-(--dil-color-muted)",
  },
  default: {
    marker: "bg-(--dil-color-primary)",
    card: "bg-(--dil-color-surface)",
    badge: "bg-(--dil-color-secondary)",
  },
} as const;

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  (
    { className, children, variant = "stepper", connector = true, ...props },
    ref,
  ) => (
    <ol
      ref={ref}
      className={cn(
        "relative space-y-4 pl-7 text-(--dil-color-text)",
        connector &&
          "before:absolute before:bottom-3 before:left-3 before:top-3 before:w-1 before:bg-(--dil-color-border) before:content-['']",
        variant === "activity" && "before:left-2.5 before:w-0.75",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  ),
);

Timeline.displayName = "Timeline";

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      children,
      marker,
      status = "default",
      title,
      description,
      timestamp,
      badge,
      icon,
      card = Boolean(title || description || timestamp || badge),
      header,
      footer,
      actions,
      progress,
      ...props
    },
    ref,
  ) => {
    const styles = statusStyles[status];
    const structuredContent =
      title ||
      description ||
      timestamp ||
      badge ||
      header ||
      footer ||
      actions ||
      progress !== undefined ? (
        <div className="space-y-2">
          {header ? (
            <div className="-mx-3 -mt-3 border-b-2 border-(--dil-color-border) bg-(--dil-color-info) p-2">
              {header}
            </div>
          ) : null}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {badge ? (
                <span
                  className={cn(
                    "mb-1 inline-flex items-center gap-1 border-2 border-(--dil-color-border) px-1.5 py-0.5 text-(--dil-font-xs) font-(--dil-font-weight-bold) uppercase text-(--dil-color-text)",
                    styles.badge,
                  )}
                >
                  {icon}
                  {badge}
                </span>
              ) : null}
              {title ? (
                <h3 className="text-(--dil-font-lg) font-(--dil-font-weight-bold) uppercase leading-tight">
                  {title}
                </h3>
              ) : null}
            </div>
            {timestamp ? (
              <time className="shrink-0 text-(--dil-font-xs) text-(--dil-color-muted)">
                {timestamp}
              </time>
            ) : null}
          </div>
          {description ? (
            <p className="text-(--dil-font-sm) text-(--dil-color-muted)">
              {description}
            </p>
          ) : null}
          {progress !== undefined ? (
            <div className="space-y-1">
              <div className="flex justify-between text-(--dil-font-xs) font-(--dil-font-weight-bold) uppercase">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-4 border-2 border-(--dil-color-border) bg-(--dil-color-muted) p-0.5">
                <div
                  className="h-full bg-(--dil-color-primary)"
                  style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                />
              </div>
            </div>
          ) : null}
          {actions ? (
            <div className="flex flex-wrap gap-2 border-t-2 border-(--dil-color-border) pt-2">
              {actions}
            </div>
          ) : null}
          {footer ? (
            <div className="border-t-2 border-(--dil-color-border) pt-2 text-(--dil-font-xs)">
              {footer}
            </div>
          ) : null}
        </div>
      ) : null;
    return (
      <li ref={ref} className={cn("relative group", className)} {...props}>
        <span
          className={cn(
            "absolute -left-7 top-1 z-10 flex size-6 items-center justify-center border-2 border-(--dil-color-border) shadow-(--dil-shadow-sm)",
            status === "queued" ? "rounded-none" : "rounded-full",
            styles.marker,
          )}
          aria-hidden="true"
        >
          {marker ??
            icon ??
            (status === "completed" ? "✓" : status === "active" ? "→" : "")}
        </span>
        <div
          className={cn(
            "min-w-0",
            card &&
              "border-2 border-(--dil-color-border) p-3 shadow-(--dil-shadow-md)",
            card && styles.card,
          )}
        >
          {structuredContent}
          {children}
        </div>
      </li>
    );
  },
);

TimelineItem.displayName = "TimelineItem";

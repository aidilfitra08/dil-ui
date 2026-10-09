import { forwardRef } from "react";
import { cn } from "../../../lib/utils";
import type { TimelineItemProps, TimelineProps } from "./Timeline.types";

const styles = {
  completed: {
    marker: "bg-(--dil-color-primary)",
    card: "bg-(--dil-color-primary)",
  },
  active: { marker: "bg-(--dil-color-info)", card: "bg-(--dil-color-info)" },
  queued: {
    marker: "bg-(--dil-color-muted)",
    card: "bg-(--dil-color-surface)",
  },
  default: {
    marker: "bg-(--dil-color-secondary)",
    card: "bg-(--dil-color-surface)",
  },
} as const;

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  (
    {
      orientation = "vertical",
      connector = true,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <ol
      ref={ref}
      data-orientation={orientation}
      className={cn(
        "group text-(--dil-color-text)",
        orientation === "vertical" &&
          "relative space-y-4 pl-7 before:absolute before:bottom-3 before:left-3 before:top-3 before:w-1 before:bg-(--dil-color-border) before:content-['']",
        orientation === "horizontal" &&
          "relative flex snap-x gap-3 overflow-x-auto pb-3 pt-1 before:absolute before:left-3 before:right-3 before:top-4 before:h-1 before:bg-(--dil-color-border) before:content-['']",
        !connector && "before:hidden",
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
      card = true,
      header,
      footer,
      actions,
      progress,
      ...props
    },
    ref,
  ) => {
    const item = (
      <div
        className={cn(
          "min-w-0",
          card &&
            "border-2 border-(--dil-color-border) p-3 shadow-(--dil-shadow-md)",
          styles[status].card,
        )}
      >
        {header ? (
          <div className="-mx-3 -mt-3 mb-2 border-b-2 border-(--dil-color-border) bg-(--dil-color-info) p-2">
            {header}
          </div>
        ) : null}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {badge ? (
              <span className="mb-1 inline-flex border-2 border-(--dil-color-border) px-1.5 py-0.5 text-(--dil-font-xs) font-(--dil-font-weight-bold) uppercase">
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
          <p className="mt-2 text-(--dil-font-sm) text-(--dil-color-muted)">
            {description}
          </p>
        ) : null}
        {progress !== undefined ? (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-(--dil-font-xs) font-bold uppercase">
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
          <div className="mt-3 flex flex-wrap gap-2 border-t-2 border-(--dil-color-border) pt-2">
            {actions}
          </div>
        ) : null}
        {footer ? (
          <div className="mt-3 border-t-2 border-(--dil-color-border) pt-2 text-(--dil-font-xs)">
            {footer}
          </div>
        ) : null}
        {children}
      </div>
    );

    return (
      <li
        ref={ref}
        className={cn(
          "relative",
          "group-data-[orientation=horizontal]:min-w-60 group-data-[orientation=horizontal]:snap-start group-data-[orientation=horizontal]:pt-8",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "absolute z-10 flex items-center justify-center border-2 border-(--dil-color-border) shadow-(--dil-shadow-sm)",
            "size-6 -left-7 top-1 group-data-[orientation=horizontal]:left-3 group-data-[orientation=horizontal]:top-1",
            status === "queued" ? "rounded-none" : "rounded-full",
            styles[status].marker,
          )}
          aria-hidden="true"
        >
          {marker ??
            icon ??
            (status === "completed" ? "✓" : status === "active" ? "→" : "")}
        </span>
        {item}
      </li>
    );
  },
);
TimelineItem.displayName = "TimelineItem";

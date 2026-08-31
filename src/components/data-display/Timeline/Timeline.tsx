import { forwardRef } from "react";

import type { TimelineItemProps, TimelineProps } from "./Timeline.types";
import { cn } from "../../../lib/utils";

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, children, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("space-y-4", "text-[var(--dil-color-text)]", className)}
      {...props}
    >
      {children}
    </ol>
  ),
);

Timeline.displayName = "Timeline";

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, children, marker, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("relative", "flex", "gap-3", "pl-1", className)}
      {...props}
    >
      <span
        className="mt-1.5 flex size-3 shrink-0 items-center justify-center rounded-full bg-[var(--dil-color-primary)] ring-4 ring-[var(--dil-color-surface)]"
        aria-hidden="true"
      >
        {marker}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  ),
);

TimelineItem.displayName = "TimelineItem";

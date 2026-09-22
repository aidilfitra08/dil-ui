import { forwardRef, useEffect, useRef, useState } from "react";

import type { SkeletonProps, SkeletonVariant } from "./Skeleton.types";
import { cn } from "../../../lib/utils";

const variantClasses: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded-(--dil-radius-sm)",
  circle: "aspect-square rounded-full",
  rect: "min-h-20 w-full rounded-(--dil-radius-md)",
};

/**
 * Renders a skeleton that follows the measured outer layout of its children.
 * The child remains in the layout but is visually hidden while loading.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { children, className, loading = true, variant = "rect", style, ...props },
    ref,
  ) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
      const element = contentRef.current;
      if (!element) return;

      const updateSize = () => {
        const rect = element.getBoundingClientRect();
        setContentSize({ width: rect.width, height: rect.height });
      };

      updateSize();
      const observer = new ResizeObserver(updateSize);
      observer.observe(element);
      return () => observer.disconnect();
    }, [children]);

    if (!children) {
      return (
        <div
          ref={ref}
          aria-hidden={loading}
          className={cn(
            "animate-pulse bg-(--dil-color-muted)",
            variantClasses[variant],
            className,
          )}
          style={{
            ...style,
            backgroundColor: "var(--dil-color-muted, #d1d5db)",
          }}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div
          ref={contentRef}
          className={cn(loading && "invisible")}
          aria-hidden={loading}
          style={style}
        >
          {children}
        </div>
        {loading ? (
          <div
            role="status"
            aria-label="Loading"
            className="pointer-events-none absolute left-0 top-0 animate-pulse rounded-(--dil-radius-md) bg-(--dil-color-muted)"
            style={{
              width: contentSize.width || "100%",
              height: contentSize.height || "100%",
              backgroundColor: "var(--dil-color-muted, #d1d5db)",
            }}
          />
        ) : null}
      </div>
    );
  },
);

Skeleton.displayName = "Skeleton";

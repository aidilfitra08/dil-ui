import { forwardRef } from "react";

import type { TextHoverProps } from "./TextHover.types";
import { cn } from "../../../lib/utils";

export const TextHover = forwardRef<HTMLSpanElement, TextHoverProps>(
  ({ className, hoverText, text, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "group",
        "relative",
        "inline-grid",
        "cursor-default",
        "overflow-hidden",
        "text-(--dil-color-text)",
        className,
      )}
      {...props}
    >
      <span className="col-start-1 row-start-1 transition-transform duration-200 group-hover:-translate-y-full">
        {text}
      </span>
      <span className="col-start-1 row-start-1 translate-y-full text-[var(--dil-color-primary)] transition-transform duration-200 group-hover:translate-y-0">
        {hoverText}
      </span>
    </span>
  ),
);

TextHover.displayName = "TextHover";

import { forwardRef, type CSSProperties } from "react";

import type { TypewriterProps } from "./Typewriter.types";
import { cn } from "../../../lib/utils";
import "./Typewriter.css";

// TODO: Refine the typewriter timing, caret behavior, and API before promoting it beyond alpha.
export const Typewriter = forwardRef<HTMLSpanElement, TypewriterProps>(
  ({ className, duration = 2, style, text, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("dil-typewriter", "text-(--dil-color-text)", className)}
      style={
        {
          "--dil-typewriter-duration": `${duration}s`,
          "--dil-typewriter-steps": text.length,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {text}
    </span>
  ),
);

Typewriter.displayName = "Typewriter";

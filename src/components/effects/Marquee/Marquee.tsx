import { forwardRef, type CSSProperties } from "react";

import type { MarqueeProps } from "./Marquee.types";
import { cn } from "../../../lib/utils";
import "./Marquee.css";

// TODO: Refine the marquee API and animation behavior before promoting it beyond alpha.
export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      children,
      className,
      duration = 20,
      pauseOnHover = true,
      style,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "dil-marquee",
        pauseOnHover && "dil-marquee--pause-on-hover",
        className,
      )}
      style={
        { "--dil-marquee-duration": `${duration}s`, ...style } as CSSProperties
      }
      {...props}
    >
      <div className="dil-marquee__track">
        <span className="dil-marquee__content">{children}</span>
        <span className="dil-marquee__content" aria-hidden="true">
          {children}
        </span>
      </div>
    </div>
  ),
);

Marquee.displayName = "Marquee";

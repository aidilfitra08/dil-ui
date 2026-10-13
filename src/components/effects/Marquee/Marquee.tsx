import {
  Children,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

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
      orientation = "horizontal",
      pauseOnHover = true,
      style,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sequenceRef = useRef<HTMLDivElement | null>(null);
    const [loopSize, setLoopSize] = useState(0);
    const childrenArray = Children.toArray(children);
    const renderedChildren = childrenArray.length ? childrenArray : [null];

    useLayoutEffect(() => {
      const container = containerRef.current;
      const sequence = sequenceRef.current;
      if (!container || !sequence || typeof ResizeObserver === "undefined") return;

      const updateSize = () => {
        const containerRect = container.getBoundingClientRect();
        const sequenceRect = sequence.getBoundingClientRect();
        const viewportSize = orientation === "horizontal"
          ? containerRect.width
          : containerRect.height;
        const measuredSequenceSize = orientation === "horizontal"
          ? sequenceRect.width
          : sequenceRect.height;
        const nextSize = Math.max(
          measuredSequenceSize,
          viewportSize,
          Number.EPSILON,
        );
        setLoopSize((currentSize) =>
          Math.abs(currentSize - nextSize) < 0.5 ? currentSize : nextSize,
        );
      };

      updateSize();
      const observer = new ResizeObserver(updateSize);
      observer.observe(container);
      observer.observe(sequence);
      return () => observer.disconnect();
    }, [children, orientation]);

    const setRefs = useCallback((node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }, [ref]);

    return (
      <div
        ref={setRefs}
        className={cn(
          "dil-marquee",
          `dil-marquee--${orientation}`,
          pauseOnHover && "dil-marquee--pause-on-hover",
          className,
        )}
        style={
          {
            "--dil-marquee-duration": `${duration}s`,
            ...(loopSize
              ? { "--dil-marquee-loop-size": `${loopSize}px` }
              : {}),
            ...style,
          } as CSSProperties
        }
        {...props}
      >
        <div className="dil-marquee__track">
          <div ref={sequenceRef} className="dil-marquee__sequence">
            {renderedChildren}
          </div>
          <div className="dil-marquee__sequence" aria-hidden="true">
            {renderedChildren}
          </div>
        </div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";

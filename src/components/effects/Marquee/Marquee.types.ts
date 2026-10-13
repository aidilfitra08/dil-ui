import type { HTMLAttributes } from "react";

export type MarqueeOrientation = "horizontal" | "vertical";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
  orientation?: MarqueeOrientation;
  pauseOnHover?: boolean;
}

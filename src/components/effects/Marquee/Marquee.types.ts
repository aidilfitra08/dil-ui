import type { HTMLAttributes } from "react";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
}

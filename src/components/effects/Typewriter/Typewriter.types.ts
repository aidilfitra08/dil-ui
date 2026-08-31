import type { HTMLAttributes } from "react";

export interface TypewriterProps extends HTMLAttributes<HTMLSpanElement> {
  duration?: number;
  text: string;
}

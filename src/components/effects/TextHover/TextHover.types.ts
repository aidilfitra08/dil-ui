import type { HTMLAttributes } from "react";

export interface TextHoverProps extends HTMLAttributes<HTMLSpanElement> {
  hoverText: string;
  text: string;
}

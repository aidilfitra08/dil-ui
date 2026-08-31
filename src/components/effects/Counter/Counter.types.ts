import type { HTMLAttributes } from "react";

export interface CounterProps extends HTMLAttributes<HTMLOutputElement> {
  prefix?: string;
  suffix?: string;
  value: number;
}

import type { HTMLAttributes, ReactNode } from "react";
import type { PopoverAlign, PopoverSide } from "../Popover/Popover.types";

export type TooltipSide = PopoverSide;
export type TooltipAlign = PopoverAlign;

export interface TooltipProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  disableHoverableContent?: boolean;
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
  alignOffset?: number;
  container?: HTMLElement | null;
  forceMount?: boolean;
}

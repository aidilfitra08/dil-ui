import type {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export interface PopoverTriggerProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface PopoverAnchorProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface PopoverContentProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children?: ReactNode;
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
  alignOffset?: number;
  container?: HTMLElement | null;
  asChild?: boolean;
  forceMount?: boolean;
  style?: CSSProperties;
}

export interface PopoverCloseProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modal: boolean;
  side: PopoverSide;
  align: PopoverAlign;
  triggerId: string;
  contentId: string;
}

export type PopoverChildElement = ReactElement<Record<string, unknown>>;

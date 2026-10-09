import type { HTMLAttributes, ReactNode } from "react";

export interface DialogProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  closeOnOverlayClick?: boolean;
}

export interface DialogTriggerProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  container?: HTMLElement | null;
  forceMount?: boolean;
  asChild?: boolean;
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
}

export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
  container?: HTMLElement | null;
  forceMount?: boolean;
  closeOnOverlayClick?: boolean;
}

export interface DialogCloseProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

import type { ReactNode } from "react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastStyle = "list" | "stack" | "stack-and-list" | "stack-messy";

export interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
  maxToasts?: number;
  position?: ToastPosition;
  visibleToasts?: number;
  variant?: ToastStyle;
}

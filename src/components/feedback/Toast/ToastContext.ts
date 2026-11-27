import { createContext, useContext, type ReactNode } from "react";

import type { ToastOptions } from "./Toast.types";

interface ToastContextValue {
  toast: (options: ToastOptions | ReactNode) => string;
  dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast must be used inside <ToastProvider>.");
  return context;
}

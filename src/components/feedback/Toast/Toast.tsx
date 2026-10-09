import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "../../../lib/utils";
import type {
  ToastItem,
  ToastOptions,
  ToastPosition,
  ToastProviderProps,
  ToastStyle,
  ToastVariant,
} from "./Toast.types";

interface ToastContextValue {
  toast: (options: ToastOptions | ReactNode) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantClasses: Record<ToastVariant, string> = {
  default:
    "bg-[var(--dil-color-surface,#ffffff)] text-[var(--dil-color-text,#111827)]",
  success:
    "bg-[var(--dil-color-success,#16a34a)] text-[var(--dil-color-success-foreground,#ffffff)]",
  error:
    "bg-[var(--dil-color-danger,#dc2626)] text-[var(--dil-color-danger-foreground,#ffffff)]",
  warning:
    "bg-[var(--dil-color-warning,#eab308)] text-[var(--dil-color-warning-foreground,#111827)]",
  info: "bg-[var(--dil-color-info,#2563eb)] text-[var(--dil-color-info-foreground,#ffffff)]",
};

function ToastCard({
  item,
  onDismiss,
  index,
  position,
  expanded,
  showShadow,
  style,
  rotation,
}: {
  item: ToastItem;
  onDismiss: () => void;
  index: number;
  position: ToastPosition;
  expanded: boolean;
  showShadow: boolean;
  style: ToastStyle;
  rotation: number;
}) {
  useEffect(() => {
    if (item.duration === 0) return;
    const timeout = window.setTimeout(onDismiss, item.duration ?? 5000);
    return () => window.clearTimeout(timeout);
  }, [item.duration, onDismiss]);

  const stackDepth = -80;
  const stackTranslation = (position.startsWith("top-") ? index : -index) * 1.4;
  const stackOpacity = Math.max(0, 0.7 - (index - 1) * 0.2);
  const isStacked =
    style === "stack" ||
    style === "stack-messy" ||
    (style === "stack-and-list" && !expanded);
  const stackTransform = isStacked
    ? `translateZ(${index * stackDepth}px) translateY(${stackTranslation}rem) scale(${1 - 0.04 * index}) rotate(${rotation}deg)`
    : "translateZ(0) translateY(0) scale(1) rotate(0deg)";

  return (
    <div
      role="status"
      style={{
        zIndex: 100 - index,
        transform: stackTransform,
        opacity: isStacked && index > 0 ? stackOpacity : undefined,
      }}
      className={cn(
        "relative flex w-[min(24rem,calc(100vw-2rem))] items-start justify-between gap-4 rounded-(--dil-radius-md,0.375rem) border border-(--dil-color-border,#d1d5db) p-4 transition-[transform,opacity] duration-500",
        showShadow &&
          "shadow-(--dil-shadow-lg,0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1))",
        variantClasses[item.variant ?? "default"],
        isStacked && index > 0 && "pointer-events-none",
      )}
    >
      <div className="min-w-0">
        {item.title && <p className="font-semibold">{item.title}</p>}
        {item.description && (
          <p className="mt-1 text-sm opacity-90">{item.description}</p>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        className="shrink-0 cursor-pointer rounded px-1 text-lg leading-none opacity-80 hover:opacity-100"
        onClick={onDismiss}
      >
        ×
      </button>
    </div>
  );
}

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "left-4 top-4 items-start",
  "top-center": "left-1/2 top-4 -translate-x-1/2 items-center",
  "top-right": "right-4 top-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

function getToastRotation(id: string) {
  let hash = 0;
  for (const character of id) {
    hash = (hash * 31 + character.charCodeAt(0)) | 0;
  }
  return (Math.abs(hash) % 9) - 4;
}

/**
 * parameters:
 * - duration: default duration for toasts in milliseconds (default: 5000)
 * - maxToasts: maximum number of toasts to keep in the stack (default: 5)
 * - position: position of the toast stack (default: "top-right")
 * - visibleToasts: number of toasts to show at once (default: 3)
 */
export function ToastProvider({
  children,
  duration = 5000,
  maxToasts = 5,
  position = "top-right",
  visibleToasts = 3,
  variant = "stack-and-list",
}: ToastProviderProps) {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<ToastItem[]>([]);
  const [enteringToastId, setEnteringToastId] = useState<string | null>(null);
  const toastRefs = useRef(new Map<string, HTMLDivElement>());
  const previousToastRects = useRef(new Map<string, DOMRect>());
  const animateExpandedChange = useCallback(
    (nextExpanded: boolean) => {
      if (nextExpanded === expanded) return;
      previousToastRects.current = new Map(
        [...toastRefs.current.entries()].map(([id, element]) => [
          id,
          element.getBoundingClientRect(),
        ]),
      );
      setExpanded(nextExpanded);
    },
    [expanded],
  );

  useLayoutEffect(() => {
    if (previousToastRects.current.size === 0) return;

    const frame = window.requestAnimationFrame(() => {
      const animations: Animation[] = [];

      for (const [id, previousRect] of previousToastRects.current) {
        const element = toastRefs.current.get(id);
        if (!element) continue;

        const nextRect = element.getBoundingClientRect();
        const offsetX = previousRect.left - nextRect.left;
        const offsetY = previousRect.top - nextRect.top;

        if (offsetX === 0 && offsetY === 0) continue;

        animations.push(
          element.animate(
            [
              { transform: `translate(${offsetX}px, ${offsetY}px)` },
              { transform: "translate(0, 0)" },
            ],
            {
              duration: 500,
              easing: "ease",
              fill: "none",
            },
          ),
        );
      }

      previousToastRects.current.clear();
      return () => animations.forEach((animation) => animation.cancel());
    });

    return () => window.cancelAnimationFrame(frame);
  }, [expanded]);

  const dismiss = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);
  const toast = useCallback(
    (input: ToastOptions | ReactNode) => {
      const options: ToastOptions =
        typeof input === "object" && input !== null && !("type" in input)
          ? (input as ToastOptions)
          : { description: input };
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setItems((current) =>
        [
          ...current,
          { ...options, duration: options.duration ?? duration, id },
        ].slice(-maxToasts),
      );
      setEnteringToastId(id);
      return id;
    },
    [duration, maxToasts],
  );
  const contextValue = useMemo(() => ({ toast, dismiss }), [dismiss, toast]);
  const visibleItems = items.slice(-visibleToasts);
  const displayedItems = position.startsWith("top-")
    ? [...visibleItems].reverse()
    : visibleItems;
  const isAlwaysStacked = variant === "stack" || variant === "stack-messy";
  const isExpanded = variant === "list" || (variant === "stack-and-list" && expanded);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed z-100 w-[min(24rem,calc(100vw-2rem))]",
          isExpanded
            ? "flex flex-col gap-2"
            : "grid [grid-template-areas:'stack']",
          positionClasses[position],
        )}
        style={{ perspective: "1000px" }}
        onMouseEnter={() => {
          if (!isAlwaysStacked) animateExpandedChange(true);
        }}
        onMouseLeave={() => {
          if (!isAlwaysStacked) animateExpandedChange(false);
        }}
      >
        {displayedItems.map((item, displayIndex) => {
          const index = position.startsWith("top-")
            ? displayIndex
            : displayedItems.length - 1 - displayIndex;

          return (
            <div
              className={cn(
                "pointer-events-auto relative [grid-area:stack]",
                isExpanded && "[grid-area:auto]",
                item.id === enteringToastId &&
                  (position.startsWith("top-")
                    ? "animate-[dil-toast-enter-top_500ms_ease-out]"
                    : "animate-[dil-toast-enter-bottom_500ms_ease-out]"),
              )}
              key={item.id}
              ref={(element) => {
                if (element) {
                  toastRefs.current.set(item.id, element);
                } else {
                  toastRefs.current.delete(item.id);
                }
              }}
              style={{ zIndex: 100 - index }}
            >
              <ToastCard
                item={item}
                index={index}
                expanded={isExpanded}
                style={variant}
                rotation={variant === "stack-messy" ? getToastRotation(item.id) : 0}
                showShadow={displayedItems.length === 1}
                position={position}
                onDismiss={() => dismiss(item.id)}
              />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast must be used inside <ToastProvider>.");
  return context;
}

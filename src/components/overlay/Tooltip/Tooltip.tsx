import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useHover,
  useFocus,
  useInteractions,
  useRole,
  type FloatingContext,
} from "@floating-ui/react";

import { cn } from "../../../lib/utils";
import type {
  TooltipAlign,
  TooltipContentProps,
  TooltipProps,
  TooltipSide,
  TooltipTriggerProps,
} from "./Tooltip.types";

interface TooltipContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: FloatingContext;
  refs: ReturnType<typeof useFloating>["refs"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  nodeId: string;
  triggerId: string;
  contentId: string;
  themeScope: HTMLElement | null;
  setThemeScope: (scope: HTMLElement | null) => void;
  setPlacement: (
    side: TooltipSide,
    align: TooltipAlign,
    sideOffset: number,
    alignOffset: number,
  ) => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(component: string) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error(`${component} must be used inside <Tooltip>.`);
  return context;
}

function Slottable({
  children,
  ...props
}: { children?: ReactNode } & Record<string, unknown>) {
  if (!isValidElement(children)) return <span {...props}>{children}</span>;
  return cloneElement(children as ReactElement<Record<string, unknown>>, props);
}

export function Tooltip({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration = 300,
  disableHoverableContent = true,
}: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const triggerId = useId();
  const contentId = useId();
  const nodeId = useFloatingNodeId() ?? triggerId;
  const [side, setSide] = useState<TooltipSide>("top");
  const [align, setAlign] = useState<TooltipAlign>("center");
  const [sideOffset, setSideOffset] = useState(8);
  const [alignOffset, setAlignOffset] = useState(0);
  const [themeScope, setThemeScope] = useState<HTMLElement | null>(null);

  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    nodeId,
    placement: align === "center" ? side : `${side}-${align}`,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: sideOffset, crossAxis: alignOffset }),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
    ],
  });
  const hover = useHover(floating.context, {
    move: false,
    delay: { open: delayDuration, close: 0 },
    restMs: disableHoverableContent ? 0 : 40,
  });
  const focus = useFocus(floating.context);
  const dismiss = useDismiss(floating.context, {
    escapeKey: true,
    outsidePress: false,
  });
  const role = useRole(floating.context, { role: "tooltip" });
  const interactions = useInteractions([hover, focus, dismiss, role]);

  const value = useMemo<TooltipContextValue>(
    () => ({
      open,
      onOpenChange: setOpen,
      context: floating.context,
      refs: floating.refs,
      getReferenceProps: interactions.getReferenceProps,
      getFloatingProps: interactions.getFloatingProps,
      nodeId,
      triggerId,
      contentId,
      themeScope,
      setThemeScope,
      setPlacement: (nextSide, nextAlign, nextSideOffset, nextAlignOffset) => {
        setSide(nextSide);
        setAlign(nextAlign);
        setSideOffset(nextSideOffset);
        setAlignOffset(nextAlignOffset);
      },
    }),
    [
      open,
      floating.context,
      floating.refs,
      interactions,
      nodeId,
      triggerId,
      contentId,
      themeScope,
    ],
  );

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
}

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const context = useTooltipContext("TooltipTrigger");
    const setReference = useCallback(
      (node: HTMLElement | null) => {
        context.refs.setReference(node);
        context.setThemeScope(
          node?.closest<HTMLElement>("[data-dil-theme]") ?? null,
        );
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [context, ref],
    );
    const triggerProps = context.getReferenceProps({
      ...props,
      ref: setReference,
      id: context.triggerId,
      "aria-describedby": context.open ? context.contentId : undefined,
    });
    if (asChild) return <Slottable {...triggerProps}>{children}</Slottable>;
    return (
      <button type="button" {...triggerProps}>
        {children}
      </button>
    );
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      children,
      className,
      container,
      forceMount = false,
      side = "top",
      align = "center",
      sideOffset = 8,
      alignOffset = 0,
      ...props
    },
    ref,
  ) => {
    const context = useTooltipContext("TooltipContent");
    useEffect(() => {
      context.setPlacement(side, align, sideOffset, alignOffset);
    }, [align, alignOffset, context, side, sideOffset]);
    if (!context.open && !forceMount) return null;
    return (
      <FloatingPortal root={container ?? context.themeScope ?? undefined}>
        <div
          ref={(node) => {
            context.refs.setFloating(node);
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          id={context.contentId}
          role="tooltip"
          data-state={context.open ? "open" : "closed"}
          data-side={side}
          data-align={align}
          className={cn(
            "z-50 rounded-(--dil-radius-sm) border-2 border-(--dil-color-border) bg-(--dil-color-surface) px-3 py-2 text-(length:--dil-font-sm) text-(--dil-color-text) shadow-(--dil-shadow-md) outline-none",
            className,
          )}
          style={context.context.floatingStyles}
          {...context.getFloatingProps(props)}
        >
          {children}
        </div>
      </FloatingPortal>
    );
  },
);
TooltipContent.displayName = "TooltipContent";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

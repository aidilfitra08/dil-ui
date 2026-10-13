import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useRole,
  type FloatingContext,
} from "@floating-ui/react";

import { cn } from "../../../lib/utils";
import type {
  PopoverAlign,
  PopoverAnchorProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverProps,
  PopoverSide,
  PopoverTriggerProps,
} from "./Popover.types";

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modal: boolean;
  context: FloatingContext;
  refs: ReturnType<typeof useFloating>["refs"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  nodeId: string;
  triggerId: string;
  contentId: string;
  side: PopoverSide;
  align: PopoverAlign;
  setPlacement: (side: PopoverSide, align: PopoverAlign) => void;
  setOffsets: (sideOffset: number, alignOffset: number) => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error(`${component} must be used inside <Popover>.`);
  return context;
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    });
  };
}

function Slottable({
  children,
  ...props
}: { children?: ReactNode } & Record<string, unknown>) {
  if (!isValidElement(children)) return <span {...props}>{children}</span>;
  return cloneElement(children as ReactElement<Record<string, unknown>>, props);
}

export function Popover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  modal = false,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const triggerId = useId();
  const contentId = useId();
  const nodeId = useFloatingNodeId() ?? triggerId;
  const [side, setSide] = useState<PopoverSide>("bottom");
  const [align, setAlign] = useState<PopoverAlign>("center");
  const [sideOffset, setSideOffset] = useState(8);
  const [alignOffset, setAlignOffset] = useState(0);
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
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });
  const click = useClick(floating.context, { toggle: true });
  const dismiss = useDismiss(floating.context, {
    escapeKey: true,
    outsidePress: true,
  });
  const role = useRole(floating.context, { role: "dialog" });
  const interactions = useInteractions([click, dismiss, role]);

  const value = useMemo<PopoverContextValue>(
    () => ({
      open,
      onOpenChange: setOpen,
      modal,
      context: floating.context,
      refs: floating.refs,
      getReferenceProps: interactions.getReferenceProps,
      getFloatingProps: interactions.getFloatingProps,
      nodeId,
      triggerId,
      contentId,
      side,
      align,
      sideOffset,
      alignOffset,
      setPlacement: (nextSide, nextAlign) => {
        setSide(nextSide);
        setAlign(nextAlign);
      },
      setOffsets: (nextSideOffset, nextAlignOffset) => {
        setSideOffset(nextSideOffset);
        setAlignOffset(nextAlignOffset);
      },
    }),
    [
      open,
      modal,
      floating.context,
      floating.refs,
      interactions,
      nodeId,
      triggerId,
      contentId,
      side,
      align,
      sideOffset,
      alignOffset,
    ],
  );

  return (
    <FloatingTree>
      <PopoverContext.Provider value={value}>
        <FloatingNode id={nodeId}>{children}</FloatingNode>
      </PopoverContext.Provider>
    </FloatingTree>
  );
}

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ asChild = false, children, onClick, ...props }, ref) => {
    const context = usePopoverContext("PopoverTrigger");
    const triggerProps = context.getReferenceProps({
      ...props,
      id: context.triggerId,
      ref: composeRefs(context.refs.setReference, ref),
      "aria-controls": context.open ? context.contentId : undefined,
      "aria-expanded": context.open,
      onClick,
    });
    if (asChild) return <Slottable {...triggerProps}>{children}</Slottable>;
    return (
      <button type="button" {...triggerProps}>
        {children}
      </button>
    );
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverAnchor = forwardRef<HTMLElement, PopoverAnchorProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const context = usePopoverContext("PopoverAnchor");
    const anchorProps = {
      ...props,
      ref: composeRefs(context.refs.setReference, ref),
    };
    if (asChild) return <Slottable {...anchorProps}>{children}</Slottable>;
    return <span {...anchorProps}>{children}</span>;
  },
);
PopoverAnchor.displayName = "PopoverAnchor";

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      asChild = false,
      children,
      className,
      container,
      forceMount = false,
      side = "bottom",
      align = "center",
      sideOffset = 8,
      alignOffset = 0,
      style,
      ...props
    },
    ref,
  ) => {
    const context = usePopoverContext("PopoverContent");
    const [mountedSide, setMountedSide] = useState(side);
    const [mountedAlign, setMountedAlign] = useState(align);
    const shouldRender = context.open || forceMount;
    const referenceElement = context.refs.domReference.current;
    const themeScope =
      typeof HTMLElement !== "undefined" &&
      referenceElement instanceof HTMLElement
        ? referenceElement.closest<HTMLElement>("[data-dil-theme]")
        : null;
    // `FloatingPortal` treats an explicit `null` root as “do not mount”.
    // Omit the root when no themed scope has been found so it can safely
    // fall back to document.body.
    const portalRoot = container ?? themeScope ?? undefined;
    useEffect(() => {
      context.setPlacement(side, align);
      setMountedSide(side);
      setMountedAlign(align);
      context.setOffsets(sideOffset, alignOffset);
    }, [align, alignOffset, context, side, sideOffset]);
    if (!shouldRender) return null;

    const content = (
      <div
        ref={composeRefs(context.refs.setFloating, ref)}
        id={context.contentId}
        role="dialog"
        data-state={context.open ? "open" : "closed"}
        data-side={mountedSide}
        data-align={mountedAlign}
        className={cn(
          "z-50 min-w-32 rounded-(--dil-radius-md) border-2 border-(--dil-color-border) bg-(--dil-color-surface) p-4 text-(--dil-color-text) shadow-(--dil-shadow-lg) outline-none",
          "data-[state=closed]:animate-out data-[state=open]:animate-in",
          className,
        )}
        style={{ ...context.context.floatingStyles, ...style }}
        {...context.getFloatingProps({ ...props })}
      >
        {children}
      </div>
    );
    const wrapped =
      asChild && isValidElement(children)
        ? cloneElement(children as ReactElement<Record<string, unknown>>, {
            ...props,
          })
        : content;
    return (
      <FloatingPortal root={portalRoot}>
        {context.modal ? (
          <FloatingFocusManager context={context.context} modal>
            {wrapped}
          </FloatingFocusManager>
        ) : (
          wrapped
        )}
      </FloatingPortal>
    );
  },
);
PopoverContent.displayName = "PopoverContent";

export const PopoverClose = forwardRef<HTMLElement, PopoverCloseProps>(
  ({ asChild = false, children, onClick, ...props }, ref) => {
    const context = usePopoverContext("PopoverClose");
    const closeProps = {
      ...props,
      ref,
      type: "button",
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event);
        context.onOpenChange(false);
      },
    };
    if (asChild) return <Slottable {...closeProps}>{children}</Slottable>;
    return (
      <button
        {...(closeProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children ?? "Close"}
      </button>
    );
  },
);
PopoverClose.displayName = "PopoverClose";

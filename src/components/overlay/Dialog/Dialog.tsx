import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useCallback,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

import { cn } from "../../../lib/utils";
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./Dialog.types";

interface DialogContextValue {
  open: boolean;
  modal: boolean;
  closeOnOverlayClick: boolean;
  onOpenChange: (open: boolean) => void;
  context: ReturnType<typeof useFloating>["context"];
  refs: ReturnType<typeof useFloating>["refs"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  triggerId: string;
  contentId: string;
  titleId: string;
  descriptionId: string;
  themeScope: HTMLElement | null;
  setThemeScope: (scope: HTMLElement | null) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(component: string) {
  const context = useContext(DialogContext);
  if (!context) throw new Error(`${component} must be used inside <Dialog>.`);
  return context;
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) =>
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    });
}

function Slottable({
  children,
  ...props
}: { children?: ReactNode } & Record<string, unknown>) {
  if (!isValidElement(children)) return <span {...props}>{children}</span>;
  return cloneElement(children as ReactElement<Record<string, unknown>>, props);
}

export function Dialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  modal = true,
  closeOnOverlayClick = true,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const triggerId = useId();
  const contentId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const [themeScope, setThemeScope] = useState<HTMLElement | null>(null);
  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  const floatingData = useFloating({ open, onOpenChange: setOpen });
  const click = useClick(floatingData.context, { toggle: true });
  const dismiss = useDismiss(floatingData.context, {
    escapeKey: true,
    outsidePress: false,
  });
  const role = useRole(floatingData.context, { role: "dialog" });
  const interactions = useInteractions([click, dismiss, role]);
  const value = useMemo<DialogContextValue>(
    () => ({
      open,
      modal,
      closeOnOverlayClick,
      onOpenChange: setOpen,
      context: floatingData.context,
      refs: floatingData.refs,
      getReferenceProps: interactions.getReferenceProps,
      getFloatingProps: interactions.getFloatingProps,
      triggerId,
      contentId,
      titleId,
      descriptionId,
      themeScope,
      setThemeScope,
    }),
    [
      open,
      modal,
      closeOnOverlayClick,
      floatingData.context,
      floatingData.refs,
      interactions,
      triggerId,
      contentId,
      titleId,
      descriptionId,
      themeScope,
    ],
  );
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

export const DialogTrigger = forwardRef<HTMLElement, DialogTriggerProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const context = useDialogContext("DialogTrigger");
    const setReference = useCallback(
      (node: HTMLElement | null) => {
        context.refs.setReference(node);
        const scope = node?.closest<HTMLElement>("[data-dil-theme]") ?? null;
        context.setThemeScope(scope);
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [context, ref],
    );
    const triggerProps = context.getReferenceProps({
      ...props,
      id: context.triggerId,
      ref: setReference,
      "aria-haspopup": "dialog",
      "aria-expanded": context.open,
    });
    if (asChild) return <Slottable {...triggerProps}>{children}</Slottable>;
    return (
      <button type="button" {...triggerProps}>
        {children}
      </button>
    );
  },
);
DialogTrigger.displayName = "DialogTrigger";

export function DialogPortal({
  children,
  container,
  forceMount = false,
}: {
  children: ReactNode;
  container?: HTMLElement | null;
  forceMount?: boolean;
}) {
  const context = useDialogContext("DialogPortal");
  if (!context.open && !forceMount) return null;
  return (
    <FloatingPortal root={container ?? context.themeScope ?? undefined}>
      {children}
    </FloatingPortal>
  );
}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  (
    {
      className,
      container,
      forceMount = false,
      closeOnOverlayClick = true,
      onClick,
      ...props
    },
    ref,
  ) => {
    const context = useDialogContext("DialogOverlay");
    if (!context.open && !forceMount) return null;
    return (
      <div
        ref={ref}
        data-state={context.open ? "open" : "closed"}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] data-[state=closed]:animate-out data-[state=open]:animate-in",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (
            closeOnOverlayClick &&
            context.closeOnOverlayClick &&
            event.target === event.currentTarget
          )
            context.onOpenChange(false);
        }}
        {...props}
      />
    );
  },
);
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      children,
      className,
      container,
      forceMount = false,
      asChild = false,
      showClose = true,
      closeOnOverlayClick,
      ...props
    },
    ref,
  ) => {
    const context = useDialogContext("DialogContent");
    if (!context.open && !forceMount) return null;
    const closeOnOutside = closeOnOverlayClick ?? context.closeOnOverlayClick;
    const content = (
      <div
        ref={composeRefs(context.refs.setFloating, ref)}
        id={context.contentId}
        role="dialog"
        aria-modal={context.modal || undefined}
        aria-labelledby={context.titleId}
        aria-describedby={context.descriptionId}
        data-state={context.open ? "open" : "closed"}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-(--dil-radius-lg) border-2 border-(--dil-color-border) bg-(--dil-color-surface) p-6 text-(--dil-color-text) shadow-(--dil-shadow-lg) outline-none max-h-[calc(100vh-2rem)] overflow-y-auto data-[state=closed]:animate-out data-[state=open]:animate-in",
          className,
        )}
        {...context.getFloatingProps({ ...props })}
      >
        {children}
        {showClose && (
          <DialogClose
            aria-label="Close dialog"
            className="absolute right-4 top-4"
          >
            ×
          </DialogClose>
        )}
      </div>
    );
    const rendered =
      asChild && isValidElement(children)
        ? cloneElement(children as ReactElement<Record<string, unknown>>, props)
        : content;
    return (
      <DialogPortal container={container} forceMount={forceMount}>
        <DialogOverlay closeOnOverlayClick={closeOnOutside} />
        {context.modal ? (
          <FloatingFocusManager context={context.context} modal>
            {rendered}
          </FloatingFocusManager>
        ) : (
          rendered
        )}
      </DialogPortal>
    );
  },
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";
export const DialogFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const context = useDialogContext("DialogTitle");
    return (
      <h2
        ref={ref}
        id={context.titleId}
        className={cn("text-lg font-semibold", className)}
        {...props}
      />
    );
  },
);
DialogTitle.displayName = "DialogTitle";
export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const context = useDialogContext("DialogDescription");
  return (
    <p
      ref={ref}
      id={context.descriptionId}
      className={cn("text-sm opacity-75", className)}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";
export const DialogClose = forwardRef<HTMLElement, DialogCloseProps>(
  ({ asChild = false, children, onClick, ...props }, ref) => {
    const context = useDialogContext("DialogClose");
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
DialogClose.displayName = "DialogClose";

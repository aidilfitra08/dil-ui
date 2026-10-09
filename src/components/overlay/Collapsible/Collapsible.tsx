import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
} from "react";

import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from "./Collapsible.types";
import { cn } from "../../../lib/utils";

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(component: string) {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error(`${component} must be used inside <Collapsible>.`);
  return context;
}

export function Collapsible({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const contentId = useId();
  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <CollapsibleContext.Provider
      value={{ open, onOpenChange: setOpen, contentId }}
    >
      {children}
    </CollapsibleContext.Provider>
  );
}

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ children, className, onClick, ...props }, ref) => {
  const { open, onOpenChange, contentId } = useCollapsibleContext(
    "CollapsibleTrigger",
  );
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      className={cn("cursor-pointer", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onOpenChange(!open);
      }}
      {...props}
    >
      {children}
    </button>
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ children, className, forceMount = false, ...props }, ref) => {
  const { open, contentId } = useCollapsibleContext("CollapsibleContent");
  if (!open && !forceMount) return null;
  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";

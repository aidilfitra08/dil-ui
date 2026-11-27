import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type KeyboardEvent,
} from "react";

import { cn } from "../../../lib/utils";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./Accordion.types";

interface AccordionContextValue {
  type: "single" | "multiple";
  values: string[];
  disabled: boolean;
  collapsible: boolean;
  toggle: (value: string) => void;
}

interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
  open: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      children,
      className,
      value,
      defaultValue,
      onValueChange,
      type,
      disabled = false,
      ...rootProps
    } = props;
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() =>
      type === "multiple"
        ? Array.isArray(defaultValue)
          ? defaultValue
          : []
        : typeof defaultValue === "string"
          ? [defaultValue]
          : [],
    );
    const currentValue =
      value !== undefined
        ? type === "multiple"
          ? value
          : value === ""
            ? []
            : [value]
        : type === "multiple"
          ? uncontrolledValue
          : uncontrolledValue.slice(0, 1);
    const collapsible = type === "single" ? (props.collapsible ?? false) : true;
    if ("collapsible" in rootProps) delete rootProps.collapsible;

    const toggle = (itemValue: string) => {
      if (disabled) return;
      const isOpen = currentValue.includes(itemValue);
      if (type === "single" && isOpen && !collapsible) return;
      let nextValue: string[];
      if (type === "multiple") {
        nextValue = isOpen
          ? currentValue.filter((entry) => entry !== itemValue)
          : [...currentValue, itemValue];
      } else {
        nextValue = isOpen
          ? collapsible
            ? []
            : currentValue
          : [itemValue];
      }
      if (value === undefined) setUncontrolledValue(nextValue);
      if (type === "multiple") {
        (onValueChange as ((next: string[]) => void) | undefined)?.(nextValue);
      } else {
        (onValueChange as ((next: string) => void) | undefined)?.(
          nextValue[0] ?? "",
        );
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      rootProps.onKeyDown?.(event);
      if (event.defaultPrevented) return;
      const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
      if (
        !keys.includes(event.key) ||
        !(event.target instanceof HTMLButtonElement) ||
        !event.target.hasAttribute("data-accordion-trigger") ||
        event.target.closest("[data-accordion-root]") !== event.currentTarget
      )
        return;
      const enabledTriggers = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>(
          "[data-accordion-trigger]:not(:disabled)",
        ),
      ).filter((trigger) => !trigger.closest("[data-disabled]"));
      if (!enabledTriggers.length) return;
      const currentIndex = enabledTriggers.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      let nextIndex: number;
      if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = enabledTriggers.length - 1;
      else if (currentIndex < 0) nextIndex = 0;
      else {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        nextIndex =
          (currentIndex + direction + enabledTriggers.length) %
          enabledTriggers.length;
      }
      event.preventDefault();
      enabledTriggers[nextIndex]?.focus();
    };

    return (
      <AccordionContext.Provider
        value={{
          type,
          values: currentValue,
          disabled,
          collapsible,
          toggle,
        }}
      >
        <div
          {...rootProps}
          ref={ref}
          data-accordion-root=""
          data-orientation="vertical"
          className={cn("w-full", className)}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = "Accordion";

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, value, disabled = false, ...props }, ref) => {
    const accordion = useContext(AccordionContext);
    if (!accordion) {
      throw new Error("AccordionItem must be used within <Accordion>.");
    }
    const triggerId = useId();
    const contentId = useId();
    const itemDisabled = disabled || accordion.disabled;
    const itemContext: AccordionItemContextValue = {
      value,
      disabled: itemDisabled,
      open: accordion.values.includes(value),
      triggerId,
      contentId,
    };

    return (
      <AccordionItemContext.Provider value={itemContext}>
        <div
          {...props}
          ref={ref}
          data-accordion-value={value}
          data-disabled={itemDisabled ? "" : undefined}
          data-state={itemContext.open ? "open" : "closed"}
          className={cn("border-b border-(--dil-color-border)", className)}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, onClick, onKeyDown, ...props }, ref) => {
const accordion = useContext(AccordionContext);
const item = useContext(AccordionItemContext);
if (!accordion) throw new Error("AccordionTrigger must be used within <Accordion>.");
if (!item) throw new Error("AccordionTrigger must be used within <AccordionItem>.");
  return (
    <h3 className={cn("m-0")}>
      <button
        {...props}
        ref={ref}
        id={item.triggerId}
        type="button"
        aria-expanded={item.open}
        aria-controls={item.contentId}
        data-accordion-trigger=""
        aria-disabled={item.open && !accordion.collapsible ? true : undefined}
        disabled={item.disabled}
        data-state={item.open ? "open" : "closed"}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-(--dil-color-text) transition-colors hover:text-(--dil-color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dil-color-primary) disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !item.disabled) accordion.toggle(item.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
        }}
      >
        <span className="min-w-0 flex-1">{children}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className={cn(
            "size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none",
            item.open && "rotate-180",
          )}
        >
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </h3>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, ref) => {
  const item = useContext(AccordionItemContext);
  if (!item) {
    throw new Error("AccordionContent must be used within <AccordionItem>.");
  }

  return (
    <div
      {...props}
      ref={ref}
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      aria-hidden={!item.open}
      inert={!item.open}
      data-state={item.open ? "open" : "closed"}
      className={cn(
        "grid text-(--dil-color-text) transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
        item.open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        className,
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
});

AccordionContent.displayName = "AccordionContent";

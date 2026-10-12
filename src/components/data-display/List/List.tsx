import { Children, createContext, forwardRef, isValidElement, useContext } from "react";

import type { ForwardedRef } from "react";

import type { ListItemProps, ListMarker, ListProps, ListSpacing } from "./List.types";
import { cn } from "../../../lib/utils";

interface CustomMarkerContextValue {
  renderMarker: NonNullable<ListProps["renderMarker"]>;
  index: number;
}

const CustomMarkerContext = createContext<CustomMarkerContextValue | null>(null);

const markerClasses: Partial<Record<ListMarker, string>> = {
  none: "list-none",
  disc: "list-disc",
  circle: "list-[circle]",
  square: "list-[square]",
  decimal: "list-decimal",
  "lower-alpha": "list-[lower-alpha]",
  "upper-alpha": "list-[upper-alpha]",
  "lower-roman": "list-[lower-roman]",
  "upper-roman": "list-[upper-roman]",
};

const spacingClasses: Record<ListSpacing, string> = {
  none: "space-y-0",
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-4",
};

export const List = forwardRef<HTMLOListElement | HTMLUListElement, ListProps>(
  (
    {
      type = "unordered",
      marker = "default",
      renderMarker,
      spacing = "none",
      start,
      reversed,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isCustomMarker = marker === "custom" && renderMarker !== undefined;
    let itemIndex = 0;
    const listChildren = Children.map(children, (child) => {
      if (!isValidElement<ListItemProps>(child) || child.type !== ListItem) {
        return child;
      }

      const index = itemIndex++;
      return (
        <CustomMarkerContext.Provider
          key={child.key ?? index}
          value={isCustomMarker ? { renderMarker, index } : null}
        >
          {child}
        </CustomMarkerContext.Provider>
      );
    });
    const listClassName = cn(
      "pl-6 text-(--dil-color-text)",
      spacingClasses[spacing],
      marker !== "default" && markerClasses[marker],
      isCustomMarker && "list-none",
      className,
    );

    if (type === "ordered") {
      return (
        <ol
          ref={ref as ForwardedRef<HTMLOListElement>}
          className={listClassName}
          {...props}
          start={start}
          reversed={reversed}
        >
          <CustomMarkerContext.Provider value={null}>
            {listChildren}
          </CustomMarkerContext.Provider>
        </ol>
      );
    }

    return (
      <ul
        ref={ref as ForwardedRef<HTMLUListElement>}
        className={listClassName}
        {...props}
      >
        <CustomMarkerContext.Provider value={null}>
          {listChildren}
        </CustomMarkerContext.Provider>
      </ul>
    );
  },
);

List.displayName = "List";

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => {
    const markerContext = useContext(CustomMarkerContext);

    if (!markerContext) {
      return (
        <li ref={ref} className={cn("text-(--dil-color-text)", className)} {...props}>
          {children}
        </li>
      );
    }

    return (
      <li
        ref={ref}
        className={cn(
          "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2",
          "text-(--dil-color-text)",
          className,
        )}
        {...props}
      >
        <span className="leading-normal" aria-hidden="true">
          {markerContext.renderMarker(markerContext.index)}
        </span>
        <div className="min-w-0">{children}</div>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

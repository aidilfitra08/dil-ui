import { forwardRef } from "react";

import type { LabelProps } from "./Label.types";
import { cn } from "../../../lib/utils";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "inline-flex",
        "items-center",
        "gap-2",
        "text-(length:--dil-font-sm)",
        "font-(--dil-font-weight-semibold)",
        "text-(--dil-color-text)",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  ),
);

Label.displayName = "Label";

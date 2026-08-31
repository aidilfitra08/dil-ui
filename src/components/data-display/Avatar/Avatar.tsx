import { forwardRef } from "react";

import type { AvatarProps, AvatarSize } from "./Avatar.types";
import { cn } from "../../../lib/utils";

const sizeClasses: Record<AvatarSize, string> = {
  xs: "size-7 text-[var(--dil-font-xs)]",
  sm: "size-8 text-[var(--dil-font-sm)]",
  md: "size-10 text-[var(--dil-font-md)]",
  lg: "size-12 text-[var(--dil-font-lg)]",
  xl: "size-14 text-[var(--dil-font-xl)]",
  "2xl": "size-16 text-[var(--dil-font-2xl)]",
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { alt = "", children, className, fallback, size = "md", src, ...props },
    ref,
  ) => {
    const classes = cn(
      "inline-flex",
      "shrink-0",
      "items-center",
      "justify-center",
      "overflow-hidden",
      "rounded-full",
      "border",
      "border-[var(--dil-color-border)]",
      "bg-[var(--dil-color-surface)]",
      "text-[var(--dil-color-text)]",
      "font-medium",
      sizeClasses[size],
      className,
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {src ? (
          <img className="size-full object-cover" src={src} alt={alt} />
        ) : (
          (fallback ?? children)
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

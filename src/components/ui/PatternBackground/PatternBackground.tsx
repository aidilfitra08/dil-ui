import { useContext, useEffect, useState } from "react";

import { cn } from "../../../lib/utils";
import { ThemeContext } from "../../../theme/provider/ThemeContext";
import type { PatternBackgroundProps } from "./PatternBackground.types";

/**
 * Renders a non-interactive dots or grid overlay. It uses the active theme's
 * text color when available, or follows the system color scheme when standalone.
 */
export function PatternBackground({
  variant = "dots",
  dotSize = 1,
  spacing = 20,
  opacity = 0.15,
  className,
}: PatternBackgroundProps) {
  const theme = useContext(ThemeContext);
  const [isSystemDark, setIsSystemDark] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemMode = () => setIsSystemDark(mediaQuery.matches);

    updateSystemMode();
    mediaQuery.addEventListener("change", updateSystemMode);

    return () => mediaQuery.removeEventListener("change", updateSystemMode);
  }, []);

  const color =
    theme?.tokens.colors.text ?? (isSystemDark ? "#FFFFFF" : "#000000");

  const backgroundImage =
    variant === "dots"
      ? `radial-gradient(circle, color-mix(in srgb, ${color} ${opacity * 100}%, transparent) ${dotSize}px, transparent ${dotSize}px)`
      : `
        linear-gradient(
          to right,
          color-mix(in srgb, ${color} ${opacity * 100}%, transparent) 1px,
          transparent 1px
        ),
        linear-gradient(
          to bottom,
          color-mix(in srgb, ${color} ${opacity * 100}%, transparent) 1px,
          transparent 1px
        )
      `;

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
    />
  );
}

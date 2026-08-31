export type PatternVariant = "dots" | "grid";

export interface PatternBackgroundProps {
  variant?: PatternVariant;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
  className?: string;
}

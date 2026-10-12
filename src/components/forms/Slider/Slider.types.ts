export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  inverted?: boolean;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  className?: string;
  name?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

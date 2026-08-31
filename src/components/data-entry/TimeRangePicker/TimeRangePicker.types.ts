import type { HTMLAttributes } from "react";

export interface TimeRangeValue {
  end?: string;
  start?: string;
}

export interface TimeRangePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  defaultValue?: TimeRangeValue;
  onChange?: (value: TimeRangeValue) => void;
  placeholder?: string;
  value?: TimeRangeValue;
}

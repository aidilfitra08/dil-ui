import type { HTMLAttributes } from "react";

export interface DateRangeValue {
  end?: string;
  start?: string;
}

export interface DateRangePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  defaultValue?: DateRangeValue;
  formatValue?: (value: DateRangeValue) => string;
  onChange?: (value: DateRangeValue) => void;
  placeholder?: string;
  value?: DateRangeValue;
}

import type { InputHTMLAttributes } from "react";

export interface MonthPickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  allowTextInput?: boolean;
}

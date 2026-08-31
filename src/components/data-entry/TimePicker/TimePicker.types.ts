import type { InputHTMLAttributes } from "react";

export interface TimePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  allowTextInput?: boolean;
}

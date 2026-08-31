import type { InputHTMLAttributes } from "react";

export interface DatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  allowTextInput?: boolean;
}

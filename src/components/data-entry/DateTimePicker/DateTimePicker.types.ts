import type { InputHTMLAttributes } from "react";

export interface DateTimePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  allowTextInput?: boolean;
}

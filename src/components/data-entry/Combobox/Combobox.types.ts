import type { InputHTMLAttributes } from "react";

export interface ComboboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "list"
> {
  options?: readonly string[];
}

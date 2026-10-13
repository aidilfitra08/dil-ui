import type { InputHTMLAttributes } from "react";

export type { ComboboxItemProps } from "./ComboboxItem.types";

export interface ComboboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "list"
> {
  options?: readonly string[];
}

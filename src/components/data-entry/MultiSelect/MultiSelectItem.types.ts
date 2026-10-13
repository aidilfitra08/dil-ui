import type { ButtonHTMLAttributes } from "react";

export interface MultiSelectItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

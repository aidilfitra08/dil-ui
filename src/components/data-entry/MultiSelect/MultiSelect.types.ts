import type { SelectHTMLAttributes } from "react";

export interface MultiSelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "multiple"
> {
  options?: readonly string[];
  searchable?: boolean;
  placeholder?: string;
}

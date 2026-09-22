import type { InputHTMLAttributes, ReactNode } from "react";

export interface FileInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "aria-invalid"
> {
  invalid?: boolean;
  errorMessage?: ReactNode;
  label?: ReactNode;
  icon?: ReactNode;
  helperText?: ReactNode;
  /** Whether an image preview should be rendered when an image is selected. */
  showPreview?: boolean;
  /** Maximum number of files accepted. Omit for unlimited files. */
  maxFiles?: number;
  /** Called when files are selected through the picker or dropped. */
  onFilesChange?: (files: File[]) => void;
}

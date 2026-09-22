import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"aria-invalid"
> {
	invalid?: boolean;
	errorMessage?: ReactNode;
}

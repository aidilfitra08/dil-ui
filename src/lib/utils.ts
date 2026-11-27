import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return clsx("dil-ui-scope", twMerge(clsx(inputs)));
}

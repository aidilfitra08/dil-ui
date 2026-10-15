import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

export interface AccordionBaseProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  disabled?: boolean;
}

export interface AccordionSingleProps extends AccordionBaseProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  collapsible?: boolean;
  onValueChange?: (value: string) => void;
}

export interface AccordionMultipleProps extends AccordionBaseProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

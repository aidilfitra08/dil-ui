import type {
  ChangeEvent,
  FormEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export type TerminalLineType = "command" | "system" | "output";

export interface TerminalLine {
  id?: string | number;
  text: ReactNode;
  type?: TerminalLineType;
}

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
  lines: readonly TerminalLine[];
  terminalTitle?: ReactNode;
  prompt?: ReactNode;
  placeholder?: string;
  maxHeight?: number | string;
  showInput?: boolean;
  command?: string;
  defaultCommand?: string;
  onCommandChange?: (
    command: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onCommandSubmit?: (
    command: string,
    event: FormEvent<HTMLFormElement>,
  ) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "placeholder"
  >;
}

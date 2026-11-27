import type {
  ChangeEvent,
  ComponentPropsWithRef,
  FormEvent,
  HTMLAttributes,
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
  /** Scroll to the command prompt when the lines change. Defaults to false. */
  followOutput?: boolean;
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
    ComponentPropsWithRef<"input">,
    "value" | "defaultValue" | "onChange" | "placeholder"
  >;
}

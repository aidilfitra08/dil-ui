import { forwardRef, useState } from "react";

import type { TerminalLine, TerminalProps } from "./Terminal.types";
import { cn } from "../../../lib/utils";

const lineClasses: Record<NonNullable<TerminalLine["type"]>, string> = {
  command: "text-(--dil-color-terminal)",
  system: "text-(--dil-color-terminal)",
  output: "pl-4 text-(--dil-color-muted)",
};

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      className,
      lines,
      terminalTitle = "terminal",
      prompt = "$",
      placeholder = "Type a command",
      maxHeight = 420,
      showInput = true,
      command,
      defaultCommand = "",
      inputProps,
      onCommandChange,
      onCommandSubmit,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledCommand, setUncontrolledCommand] =
      useState(defaultCommand);
    const currentCommand = command ?? uncontrolledCommand;

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          "overflow-hidden",
          "rounded-(--dil-radius-lg)",
          "border-2",
          "border-(--dil-color-terminal)",
          "bg-(--dil-color-ink)",
          "p-6",
          "font-mono",
          "text-(length:--dil-font-sm)",
          "shadow-(--dil-shadow-lg)",
          className,
        )}
        {...props}
      >
        <div className="mb-4 flex items-center gap-2 border-b border-(--dil-color-terminal) pb-3">
          <div aria-hidden="true" className="flex gap-2">
            <span className="size-3 rounded-full bg-(--dil-color-danger)" />
            <span className="size-3 rounded-full bg-(--dil-color-warning)" />
            <span className="size-3 rounded-full bg-(--dil-color-terminal)" />
          </div>
          <span className="ml-2 text-(--dil-color-terminal)">
            {terminalTitle}
          </span>
        </div>

        <div className="overflow-y-auto pr-2" style={{ maxHeight }}>
          <div className="space-y-1">
            {lines.map((line, index) => {
              const type = line.type ?? "output";

              return (
                <div key={line.id ?? index} className={lineClasses[type]}>
                  {type === "command" && (
                    <span className="text-(--dil-color-warning)">
                      {prompt}{" "}
                    </span>
                  )}
                  {line.text}
                </div>
              );
            })}

            {showInput && (
              <form
                className="mt-3 flex items-center gap-2 text-(--dil-color-terminal)"
                onSubmit={(event) => {
                  event.preventDefault();
                  onCommandSubmit?.(currentCommand, event);

                  if (command === undefined) {
                    setUncontrolledCommand("");
                  }
                }}
              >
                <span className="text-(--dil-color-warning)">{prompt}</span>
                <input
                  {...inputProps}
                  value={currentCommand}
                  onChange={(event) => {
                    if (command === undefined) {
                      setUncontrolledCommand(event.target.value);
                    }

                    onCommandChange?.(event.target.value, event);
                  }}
                  placeholder={placeholder}
                  className={cn(
                    "min-w-0",
                    "flex-1",
                    "bg-transparent",
                    "text-(--dil-color-terminal)",
                    "outline-none",
                    "placeholder:text-(--dil-color-muted)",
                    inputProps?.className,
                  )}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Terminal.displayName = "Terminal";

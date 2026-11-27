import { forwardRef, useEffect, useRef, useState } from "react";

import type { TerminalLine, TerminalProps } from "./Terminal.types";
import { cn } from "../../../lib/utils";

const lineClasses: Record<NonNullable<TerminalLine["type"]>, string> = {
  command: "font-semibold text-(--dil-color-text)",
  system: "text-(--dil-color-text)",
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
      followOutput = false,
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
    const outputViewport = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const viewport = outputViewport.current;
      if (followOutput && viewport) viewport.scrollTop = viewport.scrollHeight;
    }, [followOutput, lines]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          "overflow-hidden",
          "rounded-(--dil-radius-lg)",
          "border-2",
          "border-(--dil-color-terminal)",
          "bg-(--dil-color-surface)",
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
          <span className="ml-2 text-(--dil-color-text)">
            {terminalTitle}
          </span>
        </div>

        <div ref={outputViewport} className="overflow-y-auto pr-2" style={{ maxHeight }}>
          <div className="space-y-1">
            {lines.map((line, index) => {
              const type = line.type ?? "output";

              return (
                <div
                  key={line.id ?? index}
                  className={cn("whitespace-pre-wrap wrap-anywhere", lineClasses[type])}
                >
                  {type === "command" && (
                    <span aria-hidden="true" className="font-bold text-(--dil-color-text)">
                      {prompt}{" "}
                    </span>
                  )}
                  {line.text}
                </div>
              );
            })}

            {showInput && (
              <form
                className="mt-3 flex items-center gap-2 rounded-sm text-(--dil-color-text) focus-within:outline-2 focus-within:outline-(--dil-color-text)"
                onSubmit={(event) => {
                  event.preventDefault();
                  onCommandSubmit?.(currentCommand, event);

                  if (command === undefined) {
                    setUncontrolledCommand("");
                  }
                }}
              >
                <span aria-hidden="true" className="font-bold text-(--dil-color-text)">{prompt}</span>
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
                    "text-(--dil-color-text)",
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

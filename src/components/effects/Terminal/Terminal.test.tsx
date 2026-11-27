import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Terminal } from "./Terminal";

describe("Terminal", () => {
  it("passes the input ref and keyboard handler through to the controlled input", () => {
    const inputRef = createRef<HTMLInputElement>();
    const onKeyDown = vi.fn();
    const onCommandSubmit = vi.fn();
    render(
      <Terminal
        lines={[]}
        command="status"
        inputProps={{ ref: inputRef, onKeyDown, "aria-label": "Command" }}
        onCommandSubmit={onCommandSubmit}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Command" });
    expect(inputRef.current).toBe(input);
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(onKeyDown).toHaveBeenCalledOnce();
    fireEvent.submit(input.closest("form")!);
    expect(onCommandSubmit).toHaveBeenCalledWith("status", expect.anything());
    expect(input).toHaveValue("status");
  });

  it("follows appended output only when opted in", () => {
    const firstLines = [{ text: "Ready" }];
    const nextLines = [...firstLines, { text: "New output" }];
    const { rerender } = render(<Terminal lines={firstLines} />);
    const viewport = screen.getByText("Ready").parentElement!.parentElement!;
    Object.defineProperty(viewport, "scrollHeight", { value: 480, configurable: true });

    rerender(<Terminal lines={nextLines} />);
    expect(viewport.scrollTop).toBe(0);

    rerender(<Terminal lines={nextLines} followOutput />);
    expect(viewport.scrollTop).toBe(480);

    Object.defineProperty(viewport, "scrollHeight", { value: 720 });
    rerender(<Terminal lines={[...nextLines, { text: "More output" }]} followOutput />);
    expect(viewport.scrollTop).toBe(720);
  });
});

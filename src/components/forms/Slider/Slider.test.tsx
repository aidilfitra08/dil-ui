import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders an uncontrolled value and updates with the keyboard", () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={[50]} aria-label="Volume" onValueChange={onChange} />);
    const thumb = screen.getByRole("slider");

    expect(thumb).toHaveAttribute("aria-valuenow", "50");
    thumb.focus();
    fireEvent.keyDown(thumb, { key: "ArrowRight" });
    expect(thumb).toHaveFocus();
    expect(thumb).toHaveAttribute("aria-valuenow", "51");
    expect(onChange).toHaveBeenCalledWith([51]);
  });

  it("supports controlled values and commits keyboard changes", () => {
    const onChange = vi.fn();
    const onCommit = vi.fn();
    render(<Slider value={[10]} onValueChange={onChange} onValueCommit={onCommit} />);
    const thumb = screen.getByRole("slider");

    fireEvent.keyDown(thumb, { key: "End" });
    expect(onChange).toHaveBeenCalledWith([100]);
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("clamps values, supports ranges, and enforces thumb spacing", () => {
    render(<Slider defaultValue={[-5, 98]} min={0} max={100} step={10} minStepsBetweenThumbs={2} />);
    const thumbs = screen.getAllByRole("slider");

    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "0");
    expect(thumbs[1]).toHaveAttribute("aria-valuenow", "100");
    fireEvent.keyDown(thumbs[0], { key: "End" });
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "80");
  });

  it("exposes orientation and disabled semantics", () => {
    render(<Slider defaultValue={[25]} orientation="vertical" inverted disabled aria-label="Level" />);
    const thumb = screen.getByRole("slider");

    expect(thumb).toHaveAttribute("aria-disabled", "true");
    fireEvent.keyDown(thumb, { key: "ArrowUp" });
    expect(thumb).toHaveAttribute("aria-valuenow", "25");
  });
});

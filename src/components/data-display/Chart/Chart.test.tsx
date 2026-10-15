import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Bar, BarChart, ChartContainer, ChartGrid, ChartTooltip, ChartXAxis } from "./index";

const data = [
  { month: "Jan", revenue: 120 },
  { month: "Feb", revenue: 180 },
];

const config = {
  revenue: { label: "Revenue", color: "#2563eb" },
};

describe("ChartContainer", () => {
  it("renders an accessible responsive chart container with dil-ui chart parts", () => {
    render(
      <ChartContainer config={config} aria-label="Monthly revenue">
        <BarChart data={data}>
          <ChartGrid />
          <ChartXAxis dataKey="month" />
          <ChartTooltip />
          <Bar dataKey="revenue" fill="var(--color-revenue)" />
        </BarChart>
      </ChartContainer>,
    );

    expect(screen.getByRole("img", { name: "Monthly revenue" })).toHaveAttribute(
      "data-chart",
    );
    expect(document.querySelector("[data-chart-plot]")).toBeInTheDocument();
    expect(document.querySelector(".recharts-responsive-container")).toBeInTheDocument();
  });

  it("does not require a ThemeProvider", () => {
    render(
      <ChartContainer config={config} aria-label="Revenue chart">
        <BarChart data={data}>
          <Bar dataKey="revenue" fill="var(--color-revenue)" />
        </BarChart>
      </ChartContainer>,
    );

    expect(screen.getByRole("img", { name: "Revenue chart" })).toBeInTheDocument();
  });
});

# Charts

`dil-ui` charts use Recharts for chart rendering and provide theme-aware container, grid, axis, tooltip, and legend components. Import chart helpers and chart primitives from `dil-ui`.

```tsx
import {
  Bar, BarChart, ChartContainer, ChartGrid, ChartLegend, ChartTooltip,
  ChartXAxis, ChartYAxis,
} from "dil-ui";

const data = [
  { month: "Jan", revenue: 186, expenses: 112 },
  { month: "Feb", revenue: 245, expenses: 154 },
];
const config = {
  revenue: { label: "Revenue", color: "#2563eb" },
  expenses: { label: "Expenses", color: "#14b8a6" },
};

<ChartContainer config={config} aria-label="Monthly revenue and expenses">
  <BarChart data={data}>
    <ChartGrid />
    <ChartXAxis dataKey="month" />
    <ChartYAxis />
    <ChartTooltip />
    <ChartLegend />
    <Bar dataKey="revenue" fill="var(--color-revenue)" />
    <Bar dataKey="expenses" fill="var(--color-expenses)" />
  </BarChart>
</ChartContainer>;
```

`ChartContainer` requires a `config` mapping series keys to optional `label`, `color`, light/dark `theme`, or custom `icon`. It provides a responsive chart, default height (`h-80`), accessibility layer, token-based text, grid, axis, tooltip, and legend styling, and accepts native `div` attributes and a `className`. Override the height or other layout styles with `className` or `style`.

`ChartGrid`, `ChartXAxis`, and `ChartYAxis` wrap Recharts primitives with dil-ui token defaults; standard Recharts props can override those defaults. `ChartTooltip` and `ChartLegend` supply theme-aware default content and allow Recharts props/content overrides. `ChartTooltipContent` and `ChartLegendContent` can be rendered with custom Recharts Tooltip/Legend content when advanced configuration is needed. Raw chart primitives such as `BarChart`, `LineChart`, `AreaChart`, `PieChart`, `Bar`, `Line`, and `Area` are re-exported for composition. Refer to the Recharts documentation for chart-specific data and interaction props.

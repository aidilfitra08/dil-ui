import {
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useId,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type CartesianGridProps,
  type LegendProps,
  type TooltipProps,
  type XAxisProps,
  type YAxisProps,
} from "recharts";

import { ThemeContext } from "../../../theme/provider/ThemeContext";
import { cn } from "../../../lib/utils";
import type {
  ChartConfig,
  ChartContainerProps,
  ChartLegendContentProps,
  ChartTooltipContentProps,
} from "./Chart.types";

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextValue | null>(null);

function useChartConfig() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("Chart parts must be used inside <ChartContainer>.");
  return context.config;
}

function getItemKey(
  config: ChartConfig,
  value: string | number | undefined,
  fallback?: string | number,
) {
  if (typeof value === "string" && value in config) return value;
  if (typeof fallback === "string" && fallback in config) return fallback;
  return String(value ?? fallback ?? "");
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    {
      config,
      children,
      className,
      accessibilityLayer = true,
      role = "img",
      ...props
    },
    ref,
  ) => {
    const id = useId().replace(/:/g, "");
    const themeContext = useContext(ThemeContext);
    const colors = themeContext?.tokens.colors;
    const style = {
      "--dil-chart-primary": colors?.primary ?? "currentColor",
      "--dil-chart-secondary": colors?.secondary ?? "currentColor",
      "--dil-chart-text": colors?.text ?? "currentColor",
      "--dil-chart-muted": colors?.muted ?? "currentColor",
      "--dil-chart-border": colors?.border ?? "currentColor",
      colorScheme: themeContext?.resolvedMode,
      ...Object.fromEntries(
        Object.entries(config).map(([key, series]) => [
          `--color-${key}`,
          series.theme
            ? `light-dark(${series.theme.light}, ${series.theme.dark})`
            : (series.color ?? colors?.primary ?? "currentColor"),
        ]),
      ),
    } as CSSProperties;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          {...props}
          ref={ref}
          id={`dil-chart-${id}`}
          role={role}
          aria-label={props["aria-label"] ?? "Chart"}
          data-chart={id}
          className={cn(
            "relative flex h-80 w-full flex-col justify-center text-(--dil-chart-text)",
            className,
          )}
          style={{ ...style, ...props.style }}
        >
          <div className="min-h-0 w-full flex-1" data-chart-plot="">
            <ResponsiveContainer width="100%" height="100%">
              {cloneElement(
                children as ReactElement<{ accessibilityLayer?: boolean }>,
                { accessibilityLayer },
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </ChartContext.Provider>
    );
  },
);

ChartContainer.displayName = "ChartContainer";

export const ChartGrid = (props: CartesianGridProps) => (
  <CartesianGrid
    stroke="var(--dil-chart-border)"
    strokeDasharray="3 3"
    vertical={false}
    {...props}
  />
);

export const ChartXAxis = (props: XAxisProps) => (
  <XAxis
    axisLine={false}
    tickLine={false}
    tick={{ fill: "var(--dil-chart-muted)", fontSize: 12 }}
    tickMargin={8}
    {...props}
  />
);

export const ChartYAxis = (props: YAxisProps) => (
  <YAxis
    axisLine={false}
    tickLine={false}
    tick={{ fill: "var(--dil-chart-muted)", fontSize: 12 }}
    tickMargin={8}
    {...props}
  />
);

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
  nameKey,
  labelKey,
  className,
  formatter,
  labelFormatter,
}: ChartTooltipContentProps) {
  const config = useChartConfig();
  if (!active || !payload?.length) return null;

  const firstItem = payload[0];
  const labelValue = labelKey
    ? (firstItem.payload?.[labelKey] as ReactNode) ?? label
    : label;
  const formattedLabel = labelFormatter
    ? labelFormatter(labelValue, payload)
    : labelValue;

  return (
    <div className={cn("grid min-w-32 gap-2 rounded-(--dil-radius-md) border border-(--dil-chart-border) bg-(--dil-color-surface,var(--dil-color-background,white)) px-3 py-2 text-(--dil-chart-text) shadow-(--dil-shadow-md)", className)}>
      {!hideLabel && formattedLabel != null && (
        <div className="font-medium">{formattedLabel}</div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = getItemKey(config, item.dataKey ?? item.name, nameKey);
          const series = config[key];
          const color = item.color ?? item.fill ?? series?.color ?? "var(--dil-chart-primary)";
          const name = nameKey
            ? (item.payload?.[nameKey] as ReactNode) ?? series?.label ?? item.name
            : series?.label ?? item.name ?? key;
          if (formatter) {
            const result = formatter(item.value, name, item, index);
            if (result === null) return null;
            return <div key={`${key}-${index}`}>{result}</div>;
          }
          return (
            <div key={`${key}-${index}`} className="flex items-center gap-2 text-sm">
              {!hideIndicator && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0",
                    indicator === "dot" && "size-2 rounded-full",
                    indicator === "line" && "h-0.5 w-3",
                    indicator === "dashed" && "h-0 w-3 border-t border-dashed",
                  )}
                  style={{ backgroundColor: indicator === "dot" ? color : undefined, borderColor: color }}
                />
              )}
              <span className="text-(--dil-chart-muted)">{name}</span>
              <span className="ml-auto font-mono font-medium tabular-nums">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ChartTooltip = (
  props: Omit<TooltipProps, "content"> & {
    content?: TooltipProps["content"];
  },
) => (
  <Tooltip
    content={props.content ?? <ChartTooltipContent />}
    cursor={{ fill: "var(--dil-chart-muted)", opacity: 0.1 }}
    {...props}
  />
);

export function ChartLegendContent({
  payload,
  hideIcon = false,
  nameKey,
}: ChartLegendContentProps) {
  const config = useChartConfig();
  if (!payload?.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-3">
      {payload.map((item, index) => {
        const key = getItemKey(config, item.dataKey, nameKey ?? item.value?.toString());
        const series = config[key];
        const Icon = series?.icon;
        const label = nameKey
          ? (item.dataKey ? series?.label : undefined) ?? item.value
          : series?.label ?? item.value;
        return (
          <span key={`${key}-${index}`} className="flex items-center gap-2 text-sm text-(--dil-chart-muted)">
            {!hideIcon && (Icon ? (
              <Icon className="size-3" />
            ) : (
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color ?? series?.color ?? "var(--dil-chart-primary)" }}
              />
            ))}
            {label}
          </span>
        );
      })}
    </div>
  );
}

export const ChartLegend = (props: LegendProps) => (
  <Legend content={<ChartLegendContent />} {...props} />
);

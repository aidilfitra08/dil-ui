import type { ComponentType, HTMLAttributes, ReactNode } from "react";

export type ChartThemeColors = {
  light: string;
  dark: string;
};

export interface ChartSeriesConfig {
  label?: ReactNode;
  color?: string;
  theme?: ChartThemeColors;
  icon?: ComponentType<{ className?: string }>;
}

export type ChartConfig = Record<string, ChartSeriesConfig>;

export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: ReactNode;
  accessibilityLayer?: boolean;
}

export interface ChartTooltipPayloadItem {
  dataKey?: string | number;
  name?: string | number;
  value?: string | number | readonly (string | number)[];
  color?: string;
  fill?: string;
  payload?: Record<string, unknown>;
}

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: readonly ChartTooltipPayloadItem[];
  label?: ReactNode;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "dot" | "line" | "dashed";
  nameKey?: string;
  labelKey?: string;
  className?: string;
  formatter?: (
    value: ChartTooltipPayloadItem["value"],
    name: ReactNode,
    item: ChartTooltipPayloadItem,
    index: number,
  ) => ReactNode;
  labelFormatter?: (
    label: ReactNode,
    payload: readonly ChartTooltipPayloadItem[],
  ) => ReactNode;
}

export interface ChartLegendPayloadItem {
  dataKey?: string | number;
  value?: ReactNode;
  color?: string;
  type?: string;
}

export interface ChartLegendContentProps {
  payload?: readonly ChartLegendPayloadItem[];
  hideIcon?: boolean;
  nameKey?: string;
}

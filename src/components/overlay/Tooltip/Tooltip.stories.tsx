import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../actions/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./index";

const meta = { title: "Overlay/Tooltip", component: Tooltip } satisfies Meta<
  typeof Tooltip
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover or focus me</Button>
      </TooltipTrigger>
      <TooltipContent>Helpful context for this action.</TooltipContent>
    </Tooltip>
  ),
};

export const Positioned: Story = {
  args: { children: null },
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Top-start tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="top" align="start">
        Aligned tooltip content.
      </TooltipContent>
    </Tooltip>
  ),
};

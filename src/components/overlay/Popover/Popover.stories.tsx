import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../actions/Button";
import { Input } from "../../forms/Input";
import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./index";

const meta = { title: "Overlay/Popover", component: Popover } satisfies Meta<
  typeof Popover
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: { children: null },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="mb-3">Interactive content belongs here.</p>
        <PopoverClose asChild>
          <Button variant="outline">Close</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};

export const Controlled: Story = {
  args: { children: null },
  render: () => (
    <Popover defaultOpen>
      <PopoverAnchor asChild>
        <Input aria-label="Search" placeholder="Search" />
      </PopoverAnchor>
      <PopoverContent side="bottom" align="start">
        Command results appear here.
      </PopoverContent>
    </Popover>
  ),
};

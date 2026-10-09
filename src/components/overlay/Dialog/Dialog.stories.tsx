import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../actions/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./index";

const meta = { title: "Overlay/Dialog", component: Dialog } satisfies Meta<
  typeof Dialog
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { children: null },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit employee</DialogTitle>
          <DialogDescription>
            Update the employee information.
          </DialogDescription>
        </DialogHeader>
        <p>Dialog content belongs here.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  args: { children: null },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scrollable content</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index}>Additional dialog content line {index + 1}.</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
};

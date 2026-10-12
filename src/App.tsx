import { useState } from "react";

import { Button } from "./components/actions/Button";
import { IconButton } from "./components/actions/IconButton";
import { Avatar } from "./components/data-display/Avatar";
import { Badge } from "./components/data-display/Badge";
import { Card } from "./components/data-display/Card";
import { Combobox } from "./components/data-entry/Combobox";
import { DatePicker } from "./components/data-entry/DatePicker";
import { DateRangePicker } from "./components/data-entry/DateRangePicker";
import { DateTimePicker } from "./components/data-entry/DateTimePicker";
import { MonthPicker } from "./components/data-entry/MonthPicker";
import { MultiSelect } from "./components/data-entry/MultiSelect";
import { TimePicker } from "./components/data-entry/TimePicker";
import { TimeRangePicker } from "./components/data-entry/TimeRangePicker";
import { Counter } from "./components/effects/Counter";
import { GradientText } from "./components/effects/GradientText";
import { Marquee } from "./components/effects/Marquee";
import { TextHover } from "./components/effects/TextHover";
import { Terminal } from "./components/effects/Terminal";
import { Typewriter } from "./components/effects/Typewriter";
import { Spinner } from "./components/feedback/Spinner";
import { ToastProvider, useToast } from "./components/feedback/Toast";
import {
  ToastProvider as ToastProviderWithThemeProvider,
  useToast as useToastWithThemeProvider,
} from "./components/feedback/Toast";
import { Progress } from "./components/feedback/Progress";
import { Skeleton } from "./components/feedback/Skeleton";
import { Checkbox } from "./components/forms/Checkbox";
import { Input } from "./components/forms/Input";
import { FileInput } from "./components/forms/FileInput";
import { Label } from "./components/forms/Label/Label";
import { Radio } from "./components/forms/Radio";
import { Select } from "./components/forms/Select";
import { Slider } from "./components/forms/Slider";
import { Switch } from "./components/forms/Switch";
import { TextArea } from "./components/forms/TextArea/TextArea";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableEmptyContent,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/data-display/Table";
import { Timeline, TimelineItem } from "./components/data-display/Timeline";
import { ListExamples } from "./examples/ListExamples";
import { PatternBackground } from "./components/ui/PatternBackground";
import { LoadingBar, NeoNavbar } from "./components/ui";
import {
  Timeline as UITimeline,
  TimelineItem as UITimelineItem,
} from "./components/ui/Timeline";
import { ThemeProvider } from "./theme";
import type { DataTableSort } from "./components/data-display/Table";
import type { TerminalLine } from "./components/effects/Terminal";
import type { ThemeName } from "./theme";
import { Calendar } from "./icons";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./components/overlay/Popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/overlay/Dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/overlay/Tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/overlay/Collapsible";

const tableResponse = {
  header: [
    { key: "name", label: "Name", sortable: true },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ],
  data: [
    { id: 1, name: "Alya Rahman", role: "Product Designer", status: "Active" },
    { id: 2, name: "Daniel Lee", role: "Engineer", status: "Active" },
    { id: 3, name: "Nadia Ismail", role: "Researcher", status: "Away" },
    { id: 4, name: "Irfan Noor", role: "Engineer", status: "Active" },
    { id: 5, name: "Sofia Lim", role: "Product Manager", status: "Away" },
    { id: 6, name: "Jian Tan", role: "Engineer", status: "Active" },
  ],
};

const emptyTableResponse = {
  header: ["name", "status"],
  data: [],
};

const emptyTableContent = (
  <TableEmptyContent
    icon={
      <span className="inline-flex size-6 items-center justify-center rounded-full border border-current text-sm">
        i
      </span>
    }
  >
    No data available.
  </TableEmptyContent>
);

interface CustomTablePreviewProps {
  data: typeof tableResponse.data;
  onPageChange: (page: number) => void;
  onSortChange: (sort: DataTableSort) => void;
  page: number;
  pageSize: number;
  sort: DataTableSort;
  totalItems: number;
}

function CustomTablePreview({
  data,
  onPageChange,
  onSortChange,
  page,
  pageSize,
  sort,
  totalItems,
}: CustomTablePreviewProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const nameSortDirection = sort.column === "name" ? sort.direction : undefined;

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-125 border-slate-300 bg-white text-slate-900 shadow-sm">
        <TableHeader className="border-slate-300 bg-slate-100">
          <TableRow className="border-slate-300">
            <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-slate-600">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded px-1 py-0.5 transition-colors hover:bg-slate-200"
                onClick={() =>
                  onSortChange({
                    column: "name",
                    direction:
                      nameSortDirection === "ascending"
                        ? "descending"
                        : "ascending",
                  })
                }
              >
                <span>Name</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200"
                >
                  {nameSortDirection === "descending" ? "v" : "^"}
                </span>
              </button>
            </TableHead>
            <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-slate-600">
              Role
            </TableHead>
            <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-slate-600">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((person, index) => (
            <TableRow
              key={person.id}
              className={
                index % 2 === 1
                  ? "border-slate-200 bg-slate-50"
                  : "border-slate-200"
              }
            >
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    src="/test_img.png"
                    alt={`${person.name} avatar`}
                    fallback={person.name.slice(0, 2)}
                  />
                  <span className="font-medium">{person.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 text-slate-600">
                {person.role}
              </TableCell>
              <TableCell className="px-4 py-3">
                <Badge
                  variant={person.status === "Active" ? "primary" : "outline"}
                  className="rounded-full"
                >
                  {person.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-3 flex items-center justify-end gap-3 text-sm text-slate-700">
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          className="border border-slate-300 px-2 py-1 disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="border border-slate-300 px-2 py-1 disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/**
 *
 * For debug the component only
 */
function ToastExample({
  isThemeProviderEnabled = false,
}: {
  isThemeProviderEnabled?: boolean;
}) {
  const { toast } = isThemeProviderEnabled
    ? useToastWithThemeProvider()
    : useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Default",
            description: "This is an informational default message.",
            variant: "default",
          })
        }
      >
        Default toast
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Saved",
            description: "Your changes were saved.",
            variant: "success",
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Heads up",
            description: "This is an informational message.",
            variant: "info",
          })
        }
      >
        Info toast
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            title: "Error",
            description: "Something went wrong.",
            variant: "error",
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
}

function App() {
  const [tablePage, setTablePage] = useState(1);
  const [previewTheme, setPreviewTheme] = useState<ThemeName>("neobrutalism");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { id: "initial-command", type: "command", text: "status" },
    {
      id: "initial-output",
      type: "output",
      text: "Components ready for review.",
    },
  ]);
  const [tableSort, setTableSort] = useState<DataTableSort>({
    column: "name",
    direction: "ascending",
  });
  const pageSize = 2;
  const sortedTableData = [...tableResponse.data].sort(
    (firstRow, secondRow) => {
      const firstValue = String(
        firstRow[tableSort.column as keyof typeof firstRow],
      );
      const secondValue = String(
        secondRow[tableSort.column as keyof typeof secondRow],
      );
      const comparison = firstValue.localeCompare(secondValue);

      return tableSort.direction === "ascending" ? comparison : -comparison;
    },
  );
  const pagedTableData = sortedTableData.slice(
    (tablePage - 1) * pageSize,
    tablePage * pageSize,
  );
  const handleTableSort = (nextSort: DataTableSort) => {
    setTableSort(nextSort);
    setTablePage(1);
  };
  const handleTerminalCommand = (command: string) => {
    const trimmedCommand = command.trim();

    if (!trimmedCommand) {
      return;
    }

    setTerminalLines((currentLines) => [
      ...currentLines,
      { id: `command-${Date.now()}`, type: "command", text: trimmedCommand },
      {
        id: `output-${Date.now()}`,
        type: "output",
        text:
          trimmedCommand === "help"
            ? "Try status, theme, or any command you would like to handle."
            : `Command received: ${trimmedCommand}`,
      },
    ]);
  };

  return (
    <ToastProvider
      maxToasts={4}
      visibleToasts={5}
      position="bottom-right"
      duration={0}
    >
      <main className="relative min-h-screen p-8">
        <PatternBackground
          className="fixed inset-0 -z-10 dark:bg-neutral-600"
          variant="dots"
          opacity={0.95}
        />

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <section className="border border-slate-300 bg-white p-6 shadow-sm">
            <div className="mb-6 border-b border-slate-200 pb-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Without ThemeProvider
              </p>
              <h1 className="mt-1 text-2xl font-semibold">Raw components</h1>
            </div>

            <section className="mb-6 space-y-3 border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold">Toast examples</h2>
              <ToastExample isThemeProviderEnabled={false} />
            </section>

            <section className="mb-6 space-y-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Overlay primitive
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Popover composition examples
                </h2>
              </div>

              <div className="flex flex-wrap items-start gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>Simple popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-3">
                      <p className="font-medium">Interactive content</p>
                      <p className="text-sm text-slate-600">
                        This floating layer works without a ThemeProvider.
                      </p>
                      <PopoverClose asChild>
                        <Button size="sm" variant="outline">
                          Close
                        </Button>
                      </PopoverClose>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Date picker composition</Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start">
                    <div className="space-y-3">
                      <p className="font-medium">Select a date</p>
                      <DatePicker aria-label="Select date" />
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">Combobox composition</Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start">
                    <Combobox
                      aria-label="Search people"
                      placeholder="Search people"
                      options={["Alya Rahman", "Daniel Lee", "Nadia Ismail"]}
                    />
                  </PopoverContent>
                </Popover>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="info">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Raw component dialog</DialogTitle>
                      <DialogDescription>
                        This modal is rendered without ThemeProvider.
                      </DialogDescription>
                    </DialogHeader>
                    <Input placeholder="Enter a value" />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button>Save</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" aria-label="Raw tooltip example">
                      Hover or focus
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Helpful context without ThemeProvider.
                  </TooltipContent>
                </Tooltip>

                <div className="w-full">
                  <Collapsible>
                    <CollapsibleTrigger className="rounded border border-slate-300 px-3 py-2 font-medium hover:bg-slate-100">
                      Toggle details
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 rounded border border-slate-200 p-3 text-sm text-slate-600">
                      This content can be expanded and collapsed without a
                      theme.
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </section>

            <ListExamples />

            <section className="mb-6 space-y-3 border-b border-slate-200 pb-6">
              <h2 className="text-xl font-bold uppercase">
                Horizontal roadmap
              </h2>
              <UITimeline orientation="horizontal" className="w-full">
                <UITimelineItem
                  status="completed"
                  badge="Phase 01"
                  title="Q1 • Foundation"
                  description="Primitive layout system and shadow tokens."
                  footer="100% DONE"
                />
                <UITimelineItem
                  status="active"
                  badge="Phase 02"
                  title="Q2 • Multi-theme"
                  description="Custom theme generators and dynamic borders."
                  footer="65% ACTIVE"
                />
                <UITimelineItem
                  status="queued"
                  badge="Phase 03"
                  title="Q3 • Plugins & API"
                  description="Ecosystem SDK and interactive playground."
                  footer="QUEUED"
                />
              </UITimeline>
            </section>

            <section className="mb-6 space-y-3 border-b border-slate-200 pb-6">
              <h2 className="text-xl font-bold uppercase">
                Timeline &amp; activity
              </h2>
              <Timeline className="w-full">
                <TimelineItem
                  status="completed"
                  badge="Step 01 • Done"
                  title="Project initialization"
                  timestamp="09:15 AM"
                  description="Repo bootstrapped and design tokens compiled."
                />
                <TimelineItem
                  status="active"
                  badge="Step 02 • Active"
                  title="Component library build"
                  timestamp="45m elapsed"
                  description="Compiling components and verifying contrast."
                />
                <TimelineItem
                  status="queued"
                  badge="Step 03 • Queued"
                  title="Production deployment"
                  timestamp="18:00 EST"
                  description="Scheduled CDN propagation after the build completes."
                />
              </Timeline>
            </section>

            <section className="mb-6 space-y-4 border-b border-slate-200 pb-6">
              <div className="flex items-center justify-between bg-black px-3 py-2 text-sm font-black uppercase text-yellow-300 shadow-[3px_3px_0px_#000]">
                <span>01 Vertical stepper [status-driven nodes]</span>
                <span>FLOW_V1</span>
              </div>
              <div className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0px_#000]">
                <Timeline>
                  <TimelineItem
                    status="completed"
                    badge="Step 01 • Done"
                    title="Project initialization"
                    timestamp="09:15 AM"
                    description="Repo bootstrapped, design tokens compiled, CSS schema locked."
                    footer="COMMITTED • @alex_neo"
                  />
                  <TimelineItem
                    status="active"
                    badge="Step 02 • Active"
                    title="Component library build"
                    timestamp="45m elapsed"
                    description="Compiling components, generating hard shadows, verifying contrast."
                    progress={78}
                    actions={
                      <>
                        <Button size="sm">View logs</Button>
                        <Button size="sm" variant="outline">
                          Retry
                        </Button>
                      </>
                    }
                  />
                  <TimelineItem
                    status="queued"
                    badge="Step 03 • Queued"
                    title="Production deployment"
                    timestamp="18:00 EST"
                    description="Automated CDN propagation after step 02 completion."
                  />
                </Timeline>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="info">Info</Button>
              <Button variant="muted">Muted</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button as="a" variant="terminal" href="#raw-components">
                Documentation
              </Button>
              <IconButton aria-label="Add item">+</IconButton>
              <Avatar src="/test_img.png" alt="Avatar preview" fallback="AU" />
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Card className="w-44">
                <img
                  src="/test_image_card.png"
                  alt="Card preview"
                  className="h-24 w-full object-cover"
                />
                <h3 className="text-lg font-semibold">Card Title</h3>
                Card preview
              </Card>
              <CustomTablePreview
                data={pagedTableData}
                page={tablePage}
                pageSize={pageSize}
                sort={tableSort}
                totalItems={tableResponse.data.length}
                onPageChange={setTablePage}
                onSortChange={handleTableSort}
              />
              <DataTable
                header={tableResponse.header}
                data={pagedTableData}
                page={tablePage}
                pageSize={pageSize}
                sort={tableSort}
                totalItems={tableResponse.data.length}
                striped
                getRowKey={(row) => row.id as number}
                renderSortIcon={(direction) => (
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200"
                  >
                    {direction === "descending" ? "v" : "^"}
                  </span>
                )}
                onPageChange={setTablePage}
                onSortChange={handleTableSort}
              />
              <DataTable
                {...emptyTableResponse}
                emptyContent={emptyTableContent}
              />
              <Timeline className="w-full">
                <TimelineItem>
                  <p className="font-medium">Project created</p>
                  <p className="text-sm text-slate-600">Today, 9:00 AM</p>
                </TimelineItem>
                <TimelineItem>
                  <p className="font-medium">First components added</p>
                  <p className="text-sm text-slate-600">Today, 10:30 AM</p>
                </TimelineItem>
              </Timeline>
              <Combobox
                className="max-w-xs border-slate-300 bg-white"
                placeholder="Choose a role"
                options={["Product Designer", "Engineer", "Researcher"]}
              />
              <DatePicker className="max-w-xs border-slate-300 bg-white" />
              <DatePicker
                allowTextInput={false}
                className="max-w-xs border-slate-300 bg-white"
              />
              <DateRangePicker className="max-w-xs" />
              <DateTimePicker
                allowTextInput={false}
                className="max-w-xs border-slate-300 bg-white"
              />
              <MonthPicker
                allowTextInput={false}
                className="max-w-xs border-slate-300 bg-white"
              />
              <TimePicker className="max-w-xs border-slate-300 bg-white" />
              <TimeRangePicker className="max-w-xs" />
              <MultiSelect
                className="max-w-xs border-slate-300 bg-white"
                options={["Product Designer", "Engineer", "Researcher"]}
              />
              <Label>
                <Checkbox defaultChecked />
                Receive updates
              </Label>
              <Input
                className="max-w-xs border-slate-300 bg-white"
                placeholder="Email address"
              />
              <FileInput
                className="max-w-xs"
                icon={<span className="text-lg">↑</span>}
                label="Upload attachment"
                helperText="PNG, JPG, or PDF up to 10 MB"
              />
              <div className="flex gap-3">
                <Label>
                  <Radio name="raw-plan" value="monthly" defaultChecked />
                  Monthly
                </Label>
                <Label>
                  <Radio name="raw-plan" value="yearly" />
                  Yearly
                </Label>
              </div>
              <Select
                className="max-w-xs border-slate-300 bg-white"
                defaultValue=""
                options={[
                  "Select a role",
                  "Product Designer",
                  "Engineer",
                  "Researcher",
                ]}
              />
              <Label>
                <Switch defaultChecked />
                Enable notifications
              </Label>
              <TextArea
                className="max-w-xs border-slate-300 bg-white"
                placeholder="Write a message"
              />
              <Counter prefix="$" value={12500} suffix=" saved" />
              <GradientText className="text-2xl font-bold">DIL UI</GradientText>
              <Marquee className="border-y border-slate-300 py-2">
                New components are ready for review
              </Marquee>
              <TextHover
                className="text-xl font-semibold"
                text="Hover me"
                hoverText="Hello"
              />
              <Typewriter
                className="text-xl font-semibold"
                text="Building DIL UI"
              />
            </div>
            <div className="w-full max-w-xs space-y-3 ">
              <Progress value={25} size="sm" />
              <Progress value={60} showValue />
              <Progress value={85} size="lg" label="Upload progress" />
              <Slider defaultValue={[50]} aria-label="Volume" />
              <Slider defaultValue={[25, 75]} aria-label="Price range" />
              <Slider
                defaultValue={[50]}
                min={0}
                max={100}
                step={5}
                disabled
                aria-label="Disabled slider"
              />
            </div>
            <Skeleton className="w-full max-w-xs">
              <div className="space-y-2">
                <div className="h-5 w-2/3" />
                <div className="h-4 w-full" />
                <div className="h-4 w-5/6" />
              </div>
            </Skeleton>
          </section>

          <ThemeProvider theme={previewTheme} mode="system">
            <ToastProviderWithThemeProvider
              duration={0}
              maxToasts={4}
              visibleToasts={5}
              variant="stack-and-list"
            >
              <section
                className="border border-(--dil-color-border) bg-(--dil-color-surface) p-6 shadow-(--dil-shadow-sm)"
                style={{ fontFamily: "var(--dil-font-family)" }}
              >
                <div className="mb-6 border-b border-(--dil-color-border) pb-4">
                  <p className="text-(length:--dil-font-sm) font-semibold uppercase tracking-wide text-(--dil-color-text)">
                    With ThemeProvider
                  </p>
                  <h2 className="mt-1 text-(length:--dil-font-2xl) font-semibold text-(--dil-color-text)">
                    {previewTheme} theme
                  </h2>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant={
                        previewTheme === "neobrutalism" ? "primary" : "outline"
                      }
                      size="sm"
                      onClick={() => setPreviewTheme("neobrutalism")}
                    >
                      Neobrutalism
                    </Button>
                    <Button
                      variant={
                        previewTheme === "glassmorphism" ? "primary" : "outline"
                      }
                      size="sm"
                      onClick={() => setPreviewTheme("glassmorphism")}
                    >
                      Glassmorphism
                    </Button>
                    <Button
                      variant={
                        previewTheme === "retroterminal" ? "primary" : "outline"
                      }
                      size="sm"
                      onClick={() => setPreviewTheme("retroterminal")}
                    >
                      Retro Terminal
                    </Button>
                  </div>
                </div>

                <section className="mb-6 space-y-4 border-b border-(--dil-color-border) pb-6">
                  <div>
                    <p className="text-(length:--dil-font-sm) font-semibold uppercase tracking-wide text-(--dil-color-text)">
                      Overlay primitive
                    </p>
                    <h2 className="mt-1 text-(length:--dil-font-2xl) font-semibold text-(--dil-color-text)">
                      Popover composition examples
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-start gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button>Simple popover</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="space-y-3">
                          <p className="font-medium">Interactive content</p>
                          <p className="text-sm opacity-75">
                            This floating layer supports click outside and
                            Escape.
                          </p>
                          <PopoverClose asChild>
                            <Button size="sm" variant="outline">
                              Close
                            </Button>
                          </PopoverClose>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <Calendar aria-hidden="true" />
                          Date picker composition
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="bottom" align="start">
                        <div className="space-y-3">
                          <p className="font-medium">Select a date</p>
                          <DatePicker aria-label="Select date" />
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="secondary">
                          Combobox composition
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="bottom" align="start">
                        <Combobox
                          aria-label="Search people"
                          placeholder="Search people"
                          options={[
                            "Alya Rahman",
                            "Daniel Lee",
                            "Nadia Ismail",
                          ]}
                        />
                      </PopoverContent>
                    </Popover>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="info">Open themed dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Themed settings</DialogTitle>
                          <DialogDescription>
                            Dialog content uses the active design tokens.
                          </DialogDescription>
                        </DialogHeader>
                        <Input placeholder="Setting value" />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button>Save</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          aria-label="Themed tooltip example"
                        >
                          Hover or focus
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Helpful context using the active theme.
                      </TooltipContent>
                    </Tooltip>

                    <div className="w-full">
                      <Collapsible>
                        <CollapsibleTrigger className="rounded border border-(--dil-color-border) px-3 py-2 font-medium hover:bg-(--dil-color-secondary)">
                          Toggle themed details
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 rounded border border-(--dil-color-border) p-3 text-sm opacity-80">
                          This content uses the active theme tokens.
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>
                </section>

                <section className="mb-6 space-y-3 border-b border-(--dil-color-border) pb-6">
                  <h2 className="text-(length:--dil-font-xl) font-(--dil-font-weight-bold) uppercase">
                    Horizontal roadmap
                  </h2>
                  <UITimeline orientation="horizontal" className="w-full">
                    <UITimelineItem
                      status="completed"
                      badge="Phase 01"
                      title="Q1 • Foundation"
                      description="Primitive layout system and shadow tokens."
                      footer="100% DONE"
                    />
                    <UITimelineItem
                      status="active"
                      badge="Phase 02"
                      title="Q2 • Multi-theme"
                      description="Custom theme generators and dynamic borders."
                      footer="65% ACTIVE"
                    />
                    <UITimelineItem
                      status="active"
                      badge="Phase 02"
                      title="Q2 • Multi-theme"
                      description="Custom theme generators and dynamic borders."
                      footer="65% ACTIVE"
                    />
                    <UITimelineItem
                      status="queued"
                      badge="Phase 03"
                      title="Q3 • Plugins & API"
                      description="Ecosystem SDK and interactive playground."
                      footer="QUEUED"
                    />
                    <UITimelineItem
                      status="queued"
                      badge="Phase 03"
                      title="Q3 • Plugins & API"
                      description="Ecosystem SDK and interactive playground."
                      footer="QUEUED"
                    />
                    <UITimelineItem
                      status="queued"
                      badge="Phase 03"
                      title="Q3 • Plugins & API"
                      description="Ecosystem SDK and interactive playground."
                      footer="QUEUED"
                    />
                  </UITimeline>
                </section>

                <section className="mb-6 space-y-3 border-b border-(--dil-color-border) pb-6">
                  <h2 className="text-(length:--dil-font-xl) font-(--dil-font-weight-bold) uppercase text-(--dil-color-text)">
                    Timeline &amp; activity
                  </h2>
                  <Timeline className="w-full">
                    <TimelineItem
                      status="completed"
                      badge="Step 01 • Done"
                      title="Project initialization"
                      timestamp="09:15 AM"
                      description="Repo bootstrapped and design tokens compiled."
                    />
                    <TimelineItem
                      status="active"
                      badge="Step 02 • Active"
                      title="Component library build"
                      timestamp="45m elapsed"
                      description="Compiling components and verifying contrast."
                    />
                    <TimelineItem
                      status="queued"
                      badge="Step 03 • Queued"
                      title="Production deployment"
                      timestamp="18:00 EST"
                      description="Scheduled CDN propagation after the build completes."
                    />
                  </Timeline>
                </section>

                <section className="mb-6 space-y-4 border-b border-(--dil-color-border) pb-6">
                  <div className="flex items-center justify-between bg-(--dil-color-ink) px-3 py-2 text-(length:--dil-font-sm) font-(--dil-font-weight-bold) uppercase text-(--dil-color-primary) shadow-(--dil-shadow-md)">
                    <span>01 Vertical stepper [status-driven nodes]</span>
                    <span>FLOW_V1</span>
                  </div>
                  <div className="border-2 border-(--dil-color-border) bg-(--dil-color-surface) p-4 shadow-(--dil-shadow-lg)">
                    <Timeline>
                      <TimelineItem
                        status="completed"
                        badge="Step 01 • Done"
                        title="Project initialization"
                        timestamp="09:15 AM"
                        description="Repo bootstrapped, design tokens compiled, CSS schema locked."
                        footer="COMMITTED • @alex_neo"
                      />
                      <TimelineItem
                        status="active"
                        badge="Step 02 • Active"
                        title="Component library build"
                        timestamp="45m elapsed"
                        description="Compiling components, generating hard shadows, verifying contrast."
                        progress={78}
                        actions={
                          <>
                            <Button size="sm">View logs</Button>
                            <Button size="sm" variant="outline">
                              Retry
                            </Button>
                          </>
                        }
                      />
                      <TimelineItem
                        status="queued"
                        badge="Step 03 • Queued"
                        title="Production deployment"
                        timestamp="18:00 EST"
                        description="Automated CDN propagation after step 02 completion."
                      />
                    </Timeline>
                  </div>
                </section>

                <div className="mb-6 space-y-4">
                  <NeoNavbar
                    brand={
                      <span className="text-lg font-black uppercase tracking-tight">
                        NEO/KIT
                      </span>
                    }
                    items={[
                      { label: "Kit", href: "#kit" },
                      { label: "Tokens", href: "#tokens", active: true },
                      { label: "Layouts", href: "#layouts" },
                      { label: "Config", href: "#config" },
                    ]}
                    actions={
                      <div className="flex items-center gap-2">
                        <Button size="sm">⚡ Primary Action</Button>
                        <IconButton aria-label="Bookmark">★</IconButton>
                      </div>
                    }
                  />
                  <div className="space-y-3">
                    <LoadingBar value={42} label="Upload progress" />
                    <LoadingBar
                      value={72}
                      variant="secondary"
                      label="Processing progress"
                    />
                    <LoadingBar
                      indeterminate
                      variant="info"
                      label="Loading content"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="info">Info</Button>
                  <Button variant="muted">Muted</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button as="a" variant="terminal" href="#themed-components">
                    Documentation
                  </Button>
                  <Calendar size={24} />
                  <IconButton aria-label="Add item">+</IconButton>
                  <Avatar
                    src="/test_img.png"
                    alt="Avatar preview"
                    fallback="AU"
                  />
                  <Badge>Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Card className="w-44">
                    <img
                      src="/test_image_card.png"
                      alt="Card preview"
                      className="h-24 w-full object-cover"
                    />
                    <h3 className="text-lg font-semibold">Card Title</h3>
                    Card preview
                  </Card>

                  <CustomTablePreview
                    data={pagedTableData}
                    page={tablePage}
                    pageSize={pageSize}
                    sort={tableSort}
                    totalItems={tableResponse.data.length}
                    onPageChange={setTablePage}
                    onSortChange={handleTableSort}
                  />
                  <DataTable
                    isLoading
                    loadingRows={3}
                    header={tableResponse.header}
                    data={pagedTableData}
                    page={tablePage}
                    pageSize={pageSize}
                    sort={tableSort}
                    totalItems={tableResponse.data.length}
                    striped
                    getRowKey={(row) => row.id as number}
                    renderSortIcon={(direction) => (
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200"
                      >
                        {direction === "descending" ? "v" : "^"}
                      </span>
                    )}
                    onPageChange={setTablePage}
                    onSortChange={handleTableSort}
                  />
                  <DataTable
                    {...emptyTableResponse}
                    emptyContent={emptyTableContent}
                  />
                  <Timeline className="w-full">
                    <TimelineItem>
                      <p className="font-medium">Project created</p>
                      <p className="text-(length:--dil-font-sm)">
                        Today, 9:00 AM
                      </p>
                    </TimelineItem>
                    <TimelineItem>
                      <p className="font-medium">First components added</p>
                      <p className="text-(length:--dil-font-sm)">
                        Today, 10:30 AM
                      </p>
                    </TimelineItem>
                  </Timeline>
                  <Combobox
                    className="max-w-xs"
                    placeholder="Choose a role"
                    options={["Product Designer", "Engineer", "Researcher"]}
                  />
                  <DatePicker className="max-w-xs" />
                  <DatePicker allowTextInput={false} className="max-w-xs" />
                  <DateRangePicker className="max-w-xs" />
                  <DateTimePicker allowTextInput={false} className="max-w-xs" />
                  <MonthPicker allowTextInput={false} className="max-w-xs" />
                  <TimePicker className="max-w-xs" />
                  <TimeRangePicker className="max-w-xs" />
                  <div className="w-full max-w-xs space-y-3 ">
                    <Progress value={25} size="sm" />
                    <Progress value={60} showValue />
                    <Progress value={85} size="lg" label="Upload progress" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Spinner size="sm" />
                    <Spinner />
                    <Spinner size="lg" label="Loading preview" />
                  </div>
                  <MultiSelect
                    className="max-w-xs"
                    options={["Product Designer", "Engineer", "Researcher"]}
                  />
                  <Label>
                    <Checkbox defaultChecked />
                    Receive updates
                  </Label>
                  <Input className="max-w-xs" placeholder="Email address" />
                  <div className="flex gap-3">
                    <Label>
                      <Radio
                        name="themed-plan"
                        value="monthly"
                        defaultChecked
                      />
                      Monthly
                    </Label>
                    <Label>
                      <Radio name="themed-plan" value="yearly" />
                      Yearly
                    </Label>
                  </div>
                  <Label>
                    multislect
                    <Select
                      className="max-w-xs"
                      defaultValue=""
                      options={[
                        "Select a role",
                        "Product Designer",
                        "Engineer",
                        "Researcher",
                      ]}
                    />
                    multiselect
                  </Label>
                  <Label>
                    <Switch defaultChecked />
                    Enable notifications
                  </Label>
                  <TextArea
                    className="max-w-xs"
                    placeholder="Write a message"
                  />
                  <Counter prefix="$" value={12500} suffix=" saved" />
                  <GradientText className="text-2xl font-bold">
                    DIL UI
                  </GradientText>
                  <Marquee className="border-y border-(--dil-color-border) py-2">
                    New components are ready for review
                  </Marquee>
                  <TextHover
                    className="text-xl font-semibold"
                    text="Hover me"
                    hoverText="Hello"
                  />
                  <Terminal
                    className="w-full"
                    lines={terminalLines}
                    terminalTitle="terminal@dil-ui"
                    placeholder="Type a command (try 'help')"
                    onCommandSubmit={handleTerminalCommand}
                  />
                  <Typewriter
                    className="text-xl font-semibold"
                    text="Building DIL UI"
                  />
                  <Skeleton className="w-full max-w-xs">
                    <div className="space-y-2">
                      <div className="h-5 w-2/3" />
                      <div className="h-4 w-full" />
                      <div className="h-4 w-5/6" />
                    </div>
                  </Skeleton>
                  <FileInput
                    className="max-w-xs"
                    icon={<span className="text-lg">↑</span>}
                    label="Upload attachment"
                    helperText="PNG, JPG, or PDF up to 10 MB"
                  />
                </div>

                <section className="space-y-3 border-t border-(--dil-color-border) pt-6">
                  <h2 className="text-(length:--dil-font-xl) font-semibold">
                    Toast examples
                  </h2>
                  <ToastExample isThemeProviderEnabled={true} />
                </section>
                <Slider defaultValue={[50]} aria-label="Volume" />
                <Slider defaultValue={[25, 75]} aria-label="Price range" />
                <Slider
                  defaultValue={[50]}
                  min={0}
                  max={100}
                  step={5}
                  disabled
                  aria-label="Disabled slider"
                />
                <ListExamples />
              </section>
            </ToastProviderWithThemeProvider>
          </ThemeProvider>
        </div>
      </main>
    </ToastProvider>
  );
}

export default App;

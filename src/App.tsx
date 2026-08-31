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
import { Typewriter } from "./components/effects/Typewriter";
import { Checkbox } from "./components/forms/Checkbox";
import { Input } from "./components/forms/Input";
import { Label } from "./components/forms/Label/Label";
import { Radio } from "./components/forms/Radio";
import { Select } from "./components/forms/Select";
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
import { PatternBackground } from "./components/ui/PatternBackground";
import { ThemeProvider } from "./theme";
import type { DataTableSort } from "./components/data-display/Table";
import type { ThemeName } from "./theme";

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
function App() {
  const [tablePage, setTablePage] = useState(1);
  const [previewTheme, setPreviewTheme] = useState<ThemeName>("neobrutalism");
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

  return (
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

          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
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
        </section>

        <ThemeProvider theme={previewTheme} mode="system">
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
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
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
                  <p className="text-(length:--dil-font-sm)">Today, 9:00 AM</p>
                </TimelineItem>
                <TimelineItem>
                  <p className="font-medium">First components added</p>
                  <p className="text-(length:--dil-font-sm)">Today, 10:30 AM</p>
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
                  <Radio name="themed-plan" value="monthly" defaultChecked />
                  Monthly
                </Label>
                <Label>
                  <Radio name="themed-plan" value="yearly" />
                  Yearly
                </Label>
              </div>
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
              <Label>
                <Switch defaultChecked />
                Enable notifications
              </Label>
              <TextArea className="max-w-xs" placeholder="Write a message" />
              <Counter prefix="$" value={12500} suffix=" saved" />
              <GradientText className="text-2xl font-bold">DIL UI</GradientText>
              <Marquee className="border-y border-(--dil-color-border) py-2">
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
          </section>
        </ThemeProvider>
      </div>
    </main>
  );
}

export default App;

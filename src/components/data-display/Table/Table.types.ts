import type {
  HTMLAttributes,
  Key,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

export interface TableEmptyContentProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}

export type TableDataRow = Record<string, ReactNode>;

export type DataTableSortDirection = "ascending" | "descending";

export interface DataTableSort {
  column: string;
  direction: DataTableSortDirection;
}

export interface DataTableColumn {
  key: string;
  label?: ReactNode;
  sortable?: boolean;
}

/**
 * A controlled data-driven table for API responses.
 *
 * Pass the current page of rows through `data`; keep fetching, sorting, and
 * pagination state in the parent through the supplied callback props.
 */
export interface DataTableProps extends Omit<TableProps, "children"> {
  /** Rows for the currently displayed API page. */
  data: readonly TableDataRow[];
  /** Renders placeholder cells instead of row data while loading. */
  isLoading?: boolean;
  /** Number of placeholder rows rendered while loading. */
  loadingRows?: number;
  /** Content displayed when the current page has no rows. */
  emptyContent?: ReactNode;
  /** Returns a stable React key for each row. */
  getRowKey?: (row: TableDataRow, index: number) => Key;
  /** API header names or per-column display and sorting configuration. */
  header: readonly (string | DataTableColumn)[];
  /** Called with the requested page. The parent fetches and provides its rows. */
  onPageChange?: (page: number) => void;
  /** Called after a sortable column header is selected. */
  onSortChange?: (sort: DataTableSort) => void;
  /** Current one-based page number. Requires `pageSize` and `totalItems`. */
  page?: number;
  pageSize?: number;
  /** Overrides rendering for an individual data cell. */
  renderCell?: (
    value: ReactNode,
    header: string,
    row: TableDataRow,
    rowIndex: number,
  ) => ReactNode;
  /** Current server-side sort state. */
  sort?: DataTableSort;
  /** Enables sorting globally or for the supplied header keys. */
  sortable?: boolean | readonly string[];
  /** Total count across every API page. */
  totalItems?: number;
  /** Renders a custom sort indicator, including animated icon components. */
  renderSortIcon?: (sortDirection?: DataTableSortDirection) => ReactNode;
  /** Applies an alternating background to every second data row. */
  striped?: boolean;
  /** Replaces the default `bg-black/5` alternating row background. */
  stripedRowClassName?: string;
}

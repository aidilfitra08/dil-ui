import { forwardRef } from "react";

import type {
  DataTableColumn,
  DataTableProps,
  DataTableSort,
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableEmptyContentProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from "./Table.types";
import { cn } from "../../../lib/utils";

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    const classes = cn(
      "w-full",
      "border-collapse",
      "border",
      "border-(--dil-color-border)",
      "bg-(--dil-color-surface)",
      "text-left",
      "text-(length:--dil-font-sm)",
      "text-(--dil-color-text)",
      className,
    );

    return (
      <table ref={ref} className={classes} {...props}>
        {children}
      </table>
    );
  },
);

Table.displayName = "Table";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-b border-(--dil-color-border)", className)}
    {...props}
  />
));

TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={className} {...props} />
  ),
);

TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t border-(--dil-color-border)", className)}
    {...props}
  />
));

TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b border-(--dil-color-border)", className)}
      {...props}
    />
  ),
);

TableRow.displayName = "TableRow";

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn("p-2 font-semibold", className)} {...props} />
  ),
);

TableHead.displayName = "TableHead";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-2", className)} {...props} />
  ),
);

TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-2 text-(length:--dil-font-xs) text-(--dil-color-text)",
      className,
    )}
    {...props}
  />
));

TableCaption.displayName = "TableCaption";

export const TableEmptyContent = forwardRef<
  HTMLDivElement,
  TableEmptyContentProps
>(({ className, children, icon, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "gap-2",
      "py-4",
      "text-center",
      "text-(--dil-color-text)",
      className,
    )}
    {...props}
  >
    {icon ? <span aria-hidden="true">{icon}</span> : null}
    <span>{children}</span>
  </div>
));

TableEmptyContent.displayName = "TableEmptyContent";

export const DataTable = forwardRef<HTMLTableElement, DataTableProps>(
  (
    {
      className,
      data,
      emptyContent = "No data available.",
      getRowKey,
      header,
      onPageChange,
      onSortChange,
      page,
      pageSize,
      renderCell,
      renderSortIcon,
      sort,
      sortable,
      striped = false,
      stripedRowClassName = "bg-black/5",
      totalItems,
      ...props
    },
    ref,
  ) => {
    const canPaginate =
      page !== undefined && pageSize !== undefined && totalItems !== undefined;
    const totalPages = canPaginate
      ? Math.max(1, Math.ceil(totalItems / pageSize))
      : 1;

    const columns = header.map(
      (column): DataTableColumn =>
        typeof column === "string" ? { key: column, label: column } : column,
    );

    const isSortable = (column: DataTableColumn) =>
      column.sortable ??
      (sortable === true ||
        (Array.isArray(sortable) && sortable.includes(column.key)));

    const handleSort = (column: string) => {
      const nextSort: DataTableSort = {
        column,
        direction:
          sort?.column === column && sort.direction === "ascending"
            ? "descending"
            : "ascending",
      };

      onSortChange?.(nextSort);
    };

    return (
      <div className="w-full">
        <Table ref={ref} className={className} {...props}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const columnIsSortable = isSortable(column);
                const sortDirection =
                  sort?.column === column.key ? sort.direction : undefined;

                return (
                  <TableHead key={column.key} aria-sort={sortDirection}>
                    {columnIsSortable ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-(--dil-radius-xs) px-1 py-0.5 transition-colors hover:bg-(--dil-color-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dil-color-primary)"
                        onClick={() => handleSort(column.key)}
                      >
                        <span>{column.label ?? column.key}</span>
                        {renderSortIcon?.(sortDirection)}
                      </button>
                    ) : (
                      (column.label ?? column.key)
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={Math.max(columns.length, 1)}>
                  {emptyContent}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={getRowKey?.(row, rowIndex) ?? rowIndex}
                  className={
                    striped && rowIndex % 2 === 1
                      ? stripedRowClassName
                      : undefined
                  }
                >
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCell?.(
                        row[column.key],
                        column.key,
                        row,
                        rowIndex,
                      ) ?? row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {canPaginate ? (
          <div className="mt-3 flex items-center justify-end gap-3 text-(length:--dil-font-sm) text-(--dil-color-text)">
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="border border-(--dil-color-border) px-2 py-1 disabled:opacity-50"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="border border-(--dil-color-border) px-2 py-1 disabled:opacity-50"
              aria-label="Next page"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    );
  },
);

DataTable.displayName = "DataTable";

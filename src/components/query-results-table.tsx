// src/components/DynamicDataTable.tsx
import React, { useMemo, useState } from 'react'
import {
  // ColumnDef
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


interface QueryResultsTableProps {
  data: Record<string, string | number>[]
}


const columnHelper = createColumnHelper<Record<string, string | number>>()

export const QueryResultsTable: React.FC<QueryResultsTableProps> = ({ data }) => {
  const [filter, setFilter] = useState('');
  const columns = Object.keys(data[0]);
  // const tanstackColumns = useMemo( ()=>columns.map(it=>({
  //     header: it +'', 
  //     accesorKey: it+'',
  //     cell: props => props.row.getValue(it)
  //     // accesorFn: (row:  Record<string, string | number >)=> { debugger; console.log(">> wtf?"); return row[it]; }
  //     })), [data]);

  const tanstackColumns = useMemo(() => columns.map(it => (columnHelper.accessor(it, { id: it, header: it.toUpperCase() }))), [data]);

  const table = useReactTable({
    data,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter
    },
    // onGlobalFilterChange:
  })


  // console.log(">> QueryResultsTable", tanstackColumns, table, data)


  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter data..."
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} row(s) returned. Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
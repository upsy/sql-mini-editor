// src/components/DynamicDataTable.tsx
import React, {useMemo} from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface QueryResultsTableProps {
  data:  Record<string, string | number >[],
  tanstackColumns: Array<{header: string, accesorKey: string}>
}

export const QueryResultsTable: React.FC<QueryResultsTableProps> = ({ data }) => {
    const columns = Object.keys(data[0]);
    
    const tanstackColumns = useMemo( ()=>columns.map(it=>({
        header: it.toUpperCase(), 
        accesorKey: it+''
        // accesorFn: (row:  Record<string, string | number >)=> { debugger; console.log(">> wtf?"); return row[it]; }
        })), [data]);

    const table = useReactTable({
        data,
        columns: tanstackColumns,
        getCoreRowModel: getCoreRowModel(),
      })
    
    
      console.log(">> QueryResultsTable", tanstackColumns, table, data)


  return (
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
                {row.getVisibleCells().map((cell) => {console.log(">> in tanstack now", row, cell);  debugger; return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )})}
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
  )
}
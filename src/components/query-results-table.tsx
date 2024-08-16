// src/components/DynamicDataTable.tsx
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface QueryResultsTableProps {
  data:  Record<string, string | number >[]
}

export const QueryResultsTable: React.FC<QueryResultsTableProps> = ({ data }) => {
  if (!data || data.length === 0) return <p>No results to display.</p>

  const columns = Object.keys(data[0])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>
              {column.toUpperCase().replace('_', ' ')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>
                {(row)[column]?.toString() || ''}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
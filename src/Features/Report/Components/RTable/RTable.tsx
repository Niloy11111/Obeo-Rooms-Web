"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

interface DataTableProps<TData, TValue> {
  name?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function RTable<TData, TValue>({
  name,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md  ">
      <Table className="border border-[#E9E9E9] text-[12px] ">
        {/* bg-[#343a40] */}
        <TableHeader className="  bg-[#343a40]   ">
          <TableRow className="border-b">
            <TableHead
              colSpan={columns.length}
              className="text-center text-[12px]  text-white "
            >
              {name === "pickup"
                ? "Airport Pick Up Information"
                : "Airport Drop Information"}
            </TableHead>
          </TableRow>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none ">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-white text-center border-r text-[12px] max-h-max"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="  text-center hover:bg-[#17a2b8]/5"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="max-h-max text-center"
              >
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";
import * as React from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAdminUsersQuery, useBanUserMutation, useRemoveUserMutation, useUnBanUserMutation, } from "@/lib/endpoints";
export const columns = [
    {
        id: "select",
        header: ({ table }) => (<Checkbox checked={table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all"/>),
        cell: ({ row }) => (<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row"/>),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown />
        </Button>);
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "verified",
        header: () => <div className="text-right">Verified</div>,
        cell: ({ row }) => {
            return (<div className="flex justify-end lowercase">
          {row.original.emailVerified ? (<Badge>Verified</Badge>) : (<Badge variant="destructive">Unverified</Badge>)}
        </div>);
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (<div>
        {row.getValue("role") === "admin" ? (<Badge className="bg-green-500 text-white">Admin</Badge>) : (<Badge className="bg-blue-500 text-white">User</Badge>)}
      </div>),
    },
    {
        accessorKey: "banned",
        header: "Banned",
        cell: ({ row }) => (<div>
        {row.getValue("banned") ? (<Badge variant="destructive">Banned</Badge>) : (<Badge>Active</Badge>)}
      </div>),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            /* eslint-disable */
            const { mutate: banUser } = useBanUserMutation();
            const { mutate: unbanUser } = useUnBanUserMutation();
            const { mutate: removeUser } = useRemoveUserMutation();
            /* eslint-enable */
            const payment = row.original;
            if (payment.role === "admin") {
                return null;
            }
            return (<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
                    if (payment.banned) {
                        unbanUser({ userId: payment.id });
                    }
                    else {
                        banUser({ userId: payment.id });
                    }
                }}>
              {payment.banned ? "Unban user" : "Ban user"}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => removeUser({ userId: payment.id })}>
              Remove user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>);
        },
    },
];
export function DataTableDemo() {
    var _a, _b, _c, _d;
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const { data } = useAdminUsersQuery();
    const table = useReactTable({
        data: ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.users) || [],
        columns: columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return (<div className="w-full">
      <div className="flex items-center py-4">
        <Input placeholder="Filter emails..." value={(_c = (_b = table.getColumn("email")) === null || _b === void 0 ? void 0 : _b.getFilterValue()) !== null && _c !== void 0 ? _c : ""} onChange={(event) => { var _a; return (_a = table.getColumn("email")) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }} className="max-w-sm"/>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
            return (<DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>);
        })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                return (<TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>);
            })}
              </TableRow>))}
          </TableHeader>
          <TableBody>
            {((_d = table.getRowModel().rows) === null || _d === void 0 ? void 0 : _d.length) ? (table.getRowModel().rows.map((row) => (<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (<TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>))}
                </TableRow>))) : (<TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>);
}

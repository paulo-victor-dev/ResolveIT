"use client";

import { useState } from "react";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { cn } from "cn";

import { flexRender, useTable } from "@tanstack/react-table";

import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";

import { Spinner } from "../ui/spinner";

export default function DataTable({
    columns = [],
    data = [],
    isFetching = false,
    orderingState
}) {
    const { orderings, handleSetOrderings } = orderingState;

    const table = useTable({
        columns,
        data: Array.isArray(data) ? data : [],
    });

    const rows = table.getRowModel().rows;

    const getOrderingIcon = (field) => {
        if (field === "action") return;

        const current = orderings.find(
            (item) => item.replace("-", "") === field
        );

        if (!current) return null;

        return current.startsWith("-") ? (
            <ArrowDownIcon className="size-4" />
        ) : (
            <ArrowUpIcon className="size-4" />
        );
    }; 

    return (
        <div className={cn(
            "w-full h-full overflow-hidden",
            "rounded-md border",
        )}>
            <Table className="">
                <TableHeader className="bg-page-bg text-sm">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="text-sm" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead 
                                    key={header.id}
                                    className="h-12 px-4 text-sm font-bold "
                                >
                                    <div
                                        onClick={() => handleSetOrderings(header.column.columnDef.accessorKey)} 
                                        className={cn(
                                            "flex items-center gap-2",
                                            "rounded-lg cursor-pointer",
                                            "transition-colors",
                                            "hover:underline"
                                        )}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                        {getOrderingIcon(header.column.columnDef.accessorKey)}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {isFetching ? (
                        <TableRow>
                            <TableCell
                                colSpan={Math.max(columns.length, 1)}
                                className="h-24 text-center"
                            >
                                <div className="flex justify-center">
                                    <Spinner className="size-10" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : rows.length > 0 ? (
                        rows.map((row) => (
                            <TableRow className="text-xs" key={row.id}>
                                {row.getAllCells().map((cell) => (
                                    <TableCell className="h-12 px-4" key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={Math.max(columns.length, 1)}
                                className="h-24 text-center"
                            >
                                Nenhum resultado encontrado.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

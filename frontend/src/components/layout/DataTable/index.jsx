"use client";

import { cn } from "cn";

import { useTable } from "@tanstack/react-table";

import { getTableColumns } from "./table-columns";

import { Table } from "@/components/ui/table";

import TableHeader from "./table-header";
import TableBody from "./table-body";

export default function DataTable({
    data,
    isFetching = false,
    crud,

    dataFields = [],
    orderingState,

    formSchema,
    modalTitleSufix
}) {
    const columns = getTableColumns(dataFields, crud, formSchema, modalTitleSufix);

    const table = useTable({
        columns,
        data
    });

    return (
        <div className={cn(
            "w-full h-full overflow-hidden",
            "rounded-md border",
        )}>
            <Table>
                <TableHeader
                    orderingState={orderingState}
                    tableState={table}
                />

                <TableBody 
                    tableState={table}
                    isFetching={isFetching}
                    columns={columns}
                />
            </Table>
        </div>
    );
}

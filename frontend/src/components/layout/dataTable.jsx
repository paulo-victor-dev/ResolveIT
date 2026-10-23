"use client";

import { useTable } from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"

export default function DataTable({ columns, data }) {
    const table = useTable({
        columns,
        data
    });

    return (
        <Table>
            <TableHeader>
                <TableHead></TableHead>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell>

                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

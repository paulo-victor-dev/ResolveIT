import { flexRender } from "@tanstack/react-table";

import { 
    TableBody as TB,
    TableRow,
    TableCell
} from "@/components/ui/table";

import { Spinner } from "@/components/ui/spinner";

export default function TableBody({ tableState, columns, isFetching }) {
    const rows = tableState.getRowModel().rows;
    
    return (
        <TB>
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
        </TB>
    );
}

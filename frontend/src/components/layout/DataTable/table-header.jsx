import { cn } from "cn";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { flexRender } from "@tanstack/react-table";

import { 
    TableHeader as TH,
    TableRow,
    TableHead
} from "@/components/ui/table";

export default function TableHeader({ orderingState, tableState }) {
    const { orderings, handleSetOrderings } = orderingState;

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
        <TH>
            {tableState.getHeaderGroups().map((headerGroup) => (
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
        </TH>
    );
}

"use client";

import { cn } from "cn";

import { CircleCheckIcon, CircleXIcon } from "lucide-react";

import { createColumnHelper } from "@tanstack/react-table";

import TableDropdown from "@/components/layout/DataTable/table-dropdown";

const columnHelper = createColumnHelper();

export const getTableColumns = (dataFields, crud, formSchema, modalTitleSufix) => {
    let cols = dataFields
        .filter(field => field.tableShow !== false)    
        .map(col => {
            if (col.accessor === "is_active") {
                return columnHelper.accessor(col.accessor, {
                    header: col.label,

                    cell: ({ row }) => {
                        const value = row.original.is_active;
                        
                        return (
                            <span 
                                className={cn(
                                    "flex items-center justify-center",
                                    "rounded-full",
                                    value === true ? "text-success-fg" : "text-danger-fg",
                                )}
                            >
                                {value === true 
                                    ? <CircleCheckIcon />  
                                    : <CircleXIcon />
                                }
                            </span>
                        );
                    }
                });
            }

        return columnHelper.accessor(col.accessor, {
            header: col.label
        });
    });

    cols.push(
        columnHelper.display({
            id: "actions",

            cell: ({ row }) => {
                const { patch } = crud.usePatch();
                const { remove } = crud.useRemove();
                
                return <TableDropdown
                    rowData={row.original}
                    formData={{ dataFields, formSchema }}
                    onEdit={patch}
                    onDelete={remove}
                    modalTitleSufix={modalTitleSufix}
                />;
            }
        })
    );

    return cols;
};

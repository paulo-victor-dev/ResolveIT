"use client";

import { cn } from "cn";

import { CircleCheckIcon, CircleXIcon } from "lucide-react";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = columnHelper.columns([
    columnHelper.accessor("id", {
        header: "ID"
    }),

    columnHelper.accessor("username", {
        header: "Nome de usuário"
    }),

    columnHelper.accessor("email", {
        header: "E-mail"
    }),

    columnHelper.accessor("role_display", {
        header: "Função",
    }),

    columnHelper.accessor("is_active", {
        header: "Status da conta",
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
        },
    }),

    columnHelper.accessor("date_joined", {
        header: "Data cadastro"
    }),

    columnHelper.accessor("last_login", {
        header: "Último acesso"
    }),

    columnHelper.accessor("action", {
        header: "",
        cell: ({ row }) => {
            return <>...</>
        },
    }),
]);

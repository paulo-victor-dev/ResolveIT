"use client";

import { useModalContext } from "@/contexts/ModalContext";

import {
    EllipsisVerticalIcon,
    PencilIcon,
    TrashIcon
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function TableDropdown({ 
    rowData, 
    formData, 
    onEdit, 
    onDelete,
    modalTitleSufix 
}) {
    const { openModal } = useModalContext();

    const openModalConfig = {
        edit: {
            title: `Editar ${modalTitleSufix}`,
            action: {
                execute: onEdit.patch,
                isLoading: onEdit.isPatching
            },

            typeData: {
                    type: "form",
                    data: rowData,
                    formData
            },
        },

        delete: {
            title: `Deletar ${modalTitleSufix}`,
            action: {
                execute: onDelete.remove,
                isLoading: onDelete.isRemoving
            },

            typeData: {
                type: "alert",
                data: rowData
            }
        }
    };
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={
                    <Button variant="ghost">
                        <EllipsisVerticalIcon />
                    </Button>
                } />

                <DropdownMenuContent>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => openModal(openModalConfig.edit)}
                    >
                        <PencilIcon />
                        Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => openModal(openModalConfig.delete)}
                    >
                        <TrashIcon />
                        Deletar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

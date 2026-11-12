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
            action: (body = {}) => onEdit(rowData.id, body),

            typeData: {
                type: "form",
                data: rowData,
                formData: { ...formData, formType: "edit" } 
            },
        },

        delete: {
            title: `Deletar ${modalTitleSufix}`,
            action: () => onDelete(rowData.id),

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

import { useState } from "react";

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
import Modal from "../Modal";

export default function TableDropdown({ rowData, modalTitlePrefix, onEdit, onDelete }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    

    const handleOpenModal = (action) => {
        if (action === "edit") {
            setModalConfig({
                modalTitle: `Editando - ${modalTitlePrefix}`,
                action: onEdit,
                data: rowData
            });

        } else if (action === "delete") {
            setModalConfig({
                modalTitle: `Deletando - ${modalTitlePrefix}`,
                action: onDelete,
                data: rowData
            });
        }

        setModalIsOpen(true);
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
                        onClick={() => handleOpenModal("edit")}
                    >
                        <PencilIcon />
                        Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => handleOpenModal("delete")}
                    >
                        <TrashIcon />
                        Deletar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        
            <Modal
                openState={{ modalIsOpen, setModalIsOpen }}
                modalConfig={modalConfig}
            />
        </>
    );
}

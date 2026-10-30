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

export default function TableDropdown({ rowData, onEdit, onDelete }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="ghost">
                    <EllipsisVerticalIcon />
                </Button>
            } />

            <DropdownMenuContent>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={null}
                >
                    <PencilIcon />
                    Editar
                </DropdownMenuItem>

                <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={null}
                >
                    <TrashIcon />
                    Deletar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

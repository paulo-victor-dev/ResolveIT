import { useState } from "react"

export function useGetModalConfig({
    rowData, 
    modalTitlePrefix, 
    onEdit, 
    onDelete
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState(null);

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
    
    return {
        openState: { isOpen, setIsOpen },
        modalConfig, 
        handleOpenModal
    }
}

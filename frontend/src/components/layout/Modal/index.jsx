"use client";

import { useModalContext } from "@/contexts/ModalContext";

import ModalForm from "./modal-form";
import ModalAlert from "./modal-alert";

export default function Modal() {
    const { modalConfig, closeModal } = useModalContext();
    
    return (
        <>
            {modalConfig.typeData.type === "form" 
                ? <ModalForm config={modalConfig} onClose={closeModal} />
                : <ModalAlert config={modalConfig} onClose={closeModal} />
            }
        </>
    );
}

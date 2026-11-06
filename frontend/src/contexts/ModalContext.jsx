import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: "",
        action: {
            execute: null,
            isLoading: false
        },

        typeData: {
            type: "",
            data: null,
        }
    });

    const openModal = (config = {}) => {
        setModalConfig({
            ...config,
            isOpen: true,
        });
    };

    const closeModal = () => {
        setModalConfig(prev => ({
            ...prev,
            isOpen: false,
        }));
    };

    return (
        <ModalContext.Provider 
            value={{ 
                modalConfig, 
                openModal, 
                closeModal 
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export const useModalContext = () => useContext(ModalContext);

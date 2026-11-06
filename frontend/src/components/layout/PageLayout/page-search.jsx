"use client";

import { useModalContext } from "@/contexts/ModalContext";

import { ArrowUpFromLineIcon } from "lucide-react";

import Search from '../Search';
import Filters from '../Filters';

import { Button } from '@/components/ui/button';

export default function PageSearch({ 
    search, 
    pagination, 
    page, 
    filtersData, 
    crud,
    modalData
}) {
    const { openModal } = useModalContext();

    const { create, isPending } = crud.useCreate();
    
    return (
        <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
                <Search 
                    setSearchValue={search.setSearchValue}
                    setPage={pagination.setPage}
                    placeholder={page.searchPlaceholder}
                />

                <Filters
                    filtersData={filtersData}
                />
            </div>

            <div className="flex items-center gap-4">
                <Button variant="outline">
                    <ArrowUpFromLineIcon />
                    Exportar
                </Button>

                <Button
                    onClick={() => openModal({
                        title: `Criar ${page.modalTitleSufix}`,
                        action: { 
                            execute: create, 
                            isLoading: isPending 
                        },
                        typeData: {
                            type: "form",
                            data: null,
                            formData: { ...modalData }
                        }
                    })}
                >
                    {page.button.icon}
                    {page.button.text}
                </Button>
            </div>
        </div>
    );
}

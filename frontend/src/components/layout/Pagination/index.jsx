import { cn } from "cn";

import { getPaginationConfig } from "./pagination-config";

import {
    Pagination as Pg,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import PaginationPages from "./pagination-pages";

export default function Pagination({ pagination, data }) {
    const { page, setPage } = pagination;
    const { count, next, previous } = data;

    const totalItems = Number(count) || 0;

    const { 
        totalPages, 
        setNextPage,
        setPreviousPage,
        handleSetPage,
        getVisiblePages
    } = getPaginationConfig(totalItems, next, previous, page, setPage);

    return (
        <div className="w-full h-15 flex items-center justify-between px-1">
            <div className={cn(
                "flex items-center gap-1.5",
                "text-sm opacity-60"
            )}>
                <span>Total de itens:</span>
                <span className="font-semibold">
                    {totalItems}
                </span>
            </div>

            <div>
                <Pg>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                text="Anterior"
                                onClick={setPreviousPage}
                                aria-disabled={!previous}
                                className={!previous ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        <PaginationPages 
                            page={page}
                            totalPages={totalPages}
                            handleSetPage={handleSetPage}
                            getVisiblePages={getVisiblePages}
                        />

                        <PaginationItem >
                            <PaginationNext 
                                text="Próximo" 
                                onClick={setNextPage} 
                                aria-disabled={!next}
                                className={!next ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pg>
            </div>
        </div>
    );
}

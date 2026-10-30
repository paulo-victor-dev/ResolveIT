import { Fragment } from "react";

import {
    PaginationItem,
    PaginationLink,
    PaginationEllipsis
} from "@/components/ui/pagination";

export default function PaginationPages({ 
    page, 
    totalPages, 
    handleSetPage, 
    getVisiblePages
}) {
    const visiblePages = getVisiblePages(page, totalPages); 

    return (
        visiblePages.map((pageNumber, index) => {
            const previousPage = visiblePages[index - 1];
            const hasGap = previousPage && pageNumber - previousPage > 1;

            return (
                <Fragment key={pageNumber}>
                    {hasGap && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationLink
                            isActive={pageNumber === page}
                            onClick={() => handleSetPage(pageNumber)}
                            aria-current={
                                pageNumber === page ? "page" : undefined
                            }
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                </Fragment>
            );
        })
    );
}
